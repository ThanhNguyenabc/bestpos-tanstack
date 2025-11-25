/**
 * Feature: nextjs-to-tanstack-migration, Property 12: Loading state indication
 *
 * For any data fetching operation, while the operation is in progress,
 * a loading indicator should be visible to the user.
 *
 * Validates: Requirements 6.3
 */

import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { QueryClient, queryOptions } from '@tanstack/react-query'

describe('Property 12: Loading State Indication', () => {
  it('should indicate loading state during data fetching', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          id: fc.integer({ min: 1, max: 1000 }),
          data: fc.string({ minLength: 1, maxLength: 100 }),
        }),
        async (testData) => {
          const queryClient = new QueryClient({
            defaultOptions: {
              queries: {
                retry: false,
                gcTime: 0,
              },
            },
          })

          const testQueryOptions = queryOptions({
            queryKey: ['loading-test', testData.id],
            queryFn: async () => {
              // Minimal delay to simulate async
              await new Promise((resolve) => setTimeout(resolve, 1))
              return testData.data
            },
          })

          // Start fetching data
          const queryPromise = queryClient.fetchQuery(testQueryOptions)

          // Check loading state immediately after starting fetch
          const queryState = queryClient.getQueryState(
            testQueryOptions.queryKey,
          )

          // Verify query is in loading/fetching state
          expect(queryState?.fetchStatus).toBe('fetching')

          // Wait for query to complete
          const result = await queryPromise

          // Verify data was loaded
          expect(result).toBe(testData.data)

          // Check state after loading completes
          const finalState = queryClient.getQueryState(
            testQueryOptions.queryKey,
          )

          // Verify query is no longer fetching
          expect(finalState?.fetchStatus).toBe('idle')
          expect(finalState?.status).toBe('success')

          return true
        },
      ),
      { numRuns: 100 },
    )
  }, 20000)

  it('should transition from loading to success state', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(fc.integer({ min: 1, max: 100 }), {
          minLength: 1,
          maxLength: 10,
        }),
        async (dataArray) => {
          const queryClient = new QueryClient({
            defaultOptions: {
              queries: {
                retry: false,
                gcTime: 0,
              },
            },
          })

          const stateTransitions: string[] = []

          const testQueryOptions = queryOptions({
            queryKey: ['transition-test', dataArray.length],
            queryFn: async () => {
              await new Promise((resolve) => setTimeout(resolve, 1))
              return dataArray
            },
          })

          // Start fetching
          const queryPromise = queryClient.fetchQuery(testQueryOptions)

          // Record initial state
          const initialState = queryClient.getQueryState(
            testQueryOptions.queryKey,
          )
          stateTransitions.push(initialState?.fetchStatus || 'unknown')

          // Wait for completion
          await queryPromise

          // Record final state
          const finalState = queryClient.getQueryState(
            testQueryOptions.queryKey,
          )
          stateTransitions.push(finalState?.fetchStatus || 'unknown')

          // Verify state transition: fetching -> idle
          expect(stateTransitions[0]).toBe('fetching')
          expect(stateTransitions[1]).toBe('idle')
          expect(finalState?.status).toBe('success')

          return true
        },
      ),
      { numRuns: 100 },
    )
  }, 20000)

  it('should indicate loading state for multiple concurrent queries', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.record({
            id: fc.integer({ min: 1, max: 1000 }),
            value: fc.string({ minLength: 1, maxLength: 50 }),
          }),
          { minLength: 2, maxLength: 5 },
        ),
        async (dataArray) => {
          const queryClient = new QueryClient({
            defaultOptions: {
              queries: {
                retry: false,
                gcTime: 0,
              },
            },
          })

          // Create multiple queries
          const queryOptionsArray = dataArray.map((data) =>
            queryOptions({
              queryKey: ['concurrent-test', data.id],
              queryFn: async () => {
                await new Promise((resolve) => setTimeout(resolve, 1))
                return data.value
              },
            }),
          )

          // Start all queries
          const queryPromises = queryOptionsArray.map((opts) =>
            queryClient.fetchQuery(opts),
          )

          // Check that all queries are in loading state
          const loadingStates = queryOptionsArray.map((opts) => {
            const state = queryClient.getQueryState(opts.queryKey)
            return state?.fetchStatus
          })

          // All should be fetching
          expect(loadingStates.every((status) => status === 'fetching')).toBe(
            true,
          )

          // Wait for all to complete
          await Promise.all(queryPromises)

          // Check that all queries completed successfully
          const finalStates = queryOptionsArray.map((opts) => {
            const state = queryClient.getQueryState(opts.queryKey)
            return {
              fetchStatus: state?.fetchStatus,
              status: state?.status,
            }
          })

          // All should be idle and successful
          expect(
            finalStates.every(
              (state) =>
                state.fetchStatus === 'idle' && state.status === 'success',
            ),
          ).toBe(true)

          return true
        },
      ),
      { numRuns: 100 },
    )
  }, 20000)

  it('should indicate loading state even for failed queries', async () => {
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

          const errorQueryOptions = queryOptions({
            queryKey: ['error-loading-test', errorMessage],
            queryFn: async () => {
              await new Promise((resolve) => setTimeout(resolve, 1))
              throw new Error(errorMessage)
            },
          })

          // Start fetching
          const queryPromise = queryClient.fetchQuery(errorQueryOptions)

          // Check loading state
          const loadingState = queryClient.getQueryState(
            errorQueryOptions.queryKey,
          )
          expect(loadingState?.fetchStatus).toBe('fetching')

          // Wait for query to fail
          try {
            await queryPromise
          } catch (error) {
            // Expected to fail
          }

          // Check final state
          const finalState = queryClient.getQueryState(
            errorQueryOptions.queryKey,
          )

          // Should no longer be fetching, but should be in error state
          expect(finalState?.fetchStatus).toBe('idle')
          expect(finalState?.status).toBe('error')
          expect(finalState?.error).toBeInstanceOf(Error)

          return true
        },
      ),
      { numRuns: 100 },
    )
  }, 20000)
})
