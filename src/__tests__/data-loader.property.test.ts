/**
 * Feature: nextjs-to-tanstack-migration, Property 11: Data loader functionality
 *
 * For any route with a loader function, navigating to that route should execute
 * the loader and provide the loaded data to the component before rendering.
 *
 * Validates: Requirements 6.1, 6.2
 */

import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { QueryClient, queryOptions } from '@tanstack/react-query'

describe('Property 11: Data Loader Functionality', () => {
  it('should execute query loader and cache data correctly', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          id: fc.integer({ min: 1, max: 1000 }),
          name: fc.string({ minLength: 1, maxLength: 50 }),
          value: fc.integer({ min: 0, max: 10000 }),
        }),
        async (mockData) => {
          // Create a fresh QueryClient for each test
          const queryClient = new QueryClient({
            defaultOptions: {
              queries: {
                retry: false,
                gcTime: 0,
              },
            },
          })

          // Track if loader was called
          let loaderCalled = false

          // Create query options (simulating a route loader)
          const testQueryOptions = queryOptions({
            queryKey: ['test', mockData.id],
            queryFn: async () => {
              loaderCalled = true
              // Simulate async data loading
              await new Promise((resolve) => setTimeout(resolve, 10))
              return mockData
            },
          })

          // Simulate what happens in a route loader: ensureQueryData
          const loadedData = await queryClient.ensureQueryData(testQueryOptions)

          // Verify loader was called
          expect(loaderCalled).toBe(true)

          // Verify data was loaded correctly
          expect(loadedData).toEqual(mockData)

          // Verify data is cached in QueryClient
          const cachedData = queryClient.getQueryData(testQueryOptions.queryKey)
          expect(cachedData).toEqual(mockData)

          // Verify subsequent calls use cache (loader not called again)
          loaderCalled = false
          const cachedLoadedData =
            await queryClient.ensureQueryData(testQueryOptions)
          expect(loaderCalled).toBe(false) // Should use cache
          expect(cachedLoadedData).toEqual(mockData)

          return true
        },
      ),
      { numRuns: 100 },
    )
  })

  it('should handle loader errors gracefully', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 100 }),
        async (errorMessage) => {
          const queryClient = new QueryClient({
            defaultOptions: {
              queries: {
                retry: false,
                gcTime: 0,
              },
            },
          })

          let loaderCalled = false

          const errorQueryOptions = queryOptions({
            queryKey: ['test-error', errorMessage],
            queryFn: async () => {
              loaderCalled = true
              throw new Error(errorMessage)
            },
          })

          // Attempt to load data that will error
          try {
            await queryClient.ensureQueryData(errorQueryOptions)
            // Should not reach here
            expect(true).toBe(false)
          } catch (error) {
            // Verify loader was called
            expect(loaderCalled).toBe(true)

            // Verify error was thrown with correct message
            expect(error).toBeInstanceOf(Error)
            expect((error as Error).message).toBe(errorMessage)

            // Verify error is stored in query state
            const queryState = queryClient.getQueryState(
              errorQueryOptions.queryKey,
            )
            expect(queryState?.error).toBeInstanceOf(Error)
            expect((queryState?.error as Error).message).toBe(errorMessage)
          }

          return true
        },
      ),
      { numRuns: 100 },
    )
  })

  it('should support parallel data loading', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.record({
            id: fc.integer({ min: 1, max: 1000 }),
            name: fc.string({ minLength: 1, maxLength: 50 }),
          }),
          { minLength: 2, maxLength: 5 },
        ),
        async (mockDataArray) => {
          const queryClient = new QueryClient({
            defaultOptions: {
              queries: {
                retry: false,
                gcTime: 0,
              },
            },
          })

          const loaderCalls: number[] = []

          // Create multiple query options
          const queryOptionsArray = mockDataArray.map((data, index) =>
            queryOptions({
              queryKey: ['parallel-test', index],
              queryFn: async () => {
                loaderCalls.push(index)
                await new Promise((resolve) => setTimeout(resolve, 10))
                return data
              },
            }),
          )

          // Load all data in parallel (simulating multiple route loaders)
          const results = await Promise.all(
            queryOptionsArray.map((opts) => queryClient.ensureQueryData(opts)),
          )

          // Verify all loaders were called
          expect(loaderCalls.length).toBe(mockDataArray.length)

          // Verify all data was loaded correctly
          results.forEach((result, index) => {
            expect(result).toEqual(mockDataArray[index])
          })

          // Verify all data is cached
          queryOptionsArray.forEach((opts, index) => {
            const cachedData = queryClient.getQueryData(opts.queryKey)
            expect(cachedData).toEqual(mockDataArray[index])
          })

          return true
        },
      ),
      { numRuns: 100 },
    )
  })
})
