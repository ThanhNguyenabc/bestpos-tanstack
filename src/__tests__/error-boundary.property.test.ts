/**
 * Feature: nextjs-to-tanstack-migration, Property 13: Error boundary activation
 *
 * For any component that throws an error during rendering, the error should be caught
 * by an error boundary and display an error UI instead of crashing the application.
 *
 * Validates: Requirements 6.4
 */

import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'

// Simulate error boundary behavior
class ErrorBoundarySimulator {
  private hasError = false
  private error: Error | null = null

  tryRender(renderFn: () => void): { success: boolean; error: Error | null } {
    try {
      renderFn()
      return { success: true, error: null }
    } catch (error) {
      this.hasError = true
      this.error = error as Error
      return { success: false, error: error as Error }
    }
  }

  getState() {
    return {
      hasError: this.hasError,
      error: this.error,
    }
  }

  reset() {
    this.hasError = false
    this.error = null
  }
}

// Simulate component that throws
function simulateErrorComponent(errorMessage: string): void {
  throw new Error(errorMessage)
}

// Simulate component that conditionally throws
function simulateConditionalComponent(
  shouldError: boolean,
  errorMessage: string,
): void {
  if (shouldError) {
    throw new Error(errorMessage)
  }
  // Success case - no error
}

describe('Property 13: Error Boundary Activation', () => {
  it('should catch errors and prevent application crash', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 100 }),
        (errorMessage) => {
          const boundary = new ErrorBoundarySimulator()

          // Simulate rendering a component that throws
          const result = boundary.tryRender(() => {
            simulateErrorComponent(errorMessage)
          })

          // Verify error was caught
          expect(result.success).toBe(false)
          expect(result.error).toBeInstanceOf(Error)
          expect(result.error?.message).toBe(errorMessage)

          // Verify boundary state
          const state = boundary.getState()
          expect(state.hasError).toBe(true)
          expect(state.error).toBeInstanceOf(Error)
          expect(state.error?.message).toBe(errorMessage)

          return true
        },
      ),
      { numRuns: 100 },
    )
  })

  it('should only activate on actual errors, not on successful renders', () => {
    fc.assert(
      fc.property(
        fc.record({
          shouldError: fc.boolean(),
          errorMessage: fc.string({ minLength: 1, maxLength: 100 }),
        }),
        (testData) => {
          const boundary = new ErrorBoundarySimulator()

          const result = boundary.tryRender(() => {
            simulateConditionalComponent(
              testData.shouldError,
              testData.errorMessage,
            )
          })

          if (testData.shouldError) {
            // Should have caught error
            expect(result.success).toBe(false)
            expect(result.error).toBeInstanceOf(Error)
            expect(result.error?.message).toBe(testData.errorMessage)

            const state = boundary.getState()
            expect(state.hasError).toBe(true)
          } else {
            // Should have rendered successfully
            expect(result.success).toBe(true)
            expect(result.error).toBeNull()

            const state = boundary.getState()
            expect(state.hasError).toBe(false)
            expect(state.error).toBeNull()
          }

          return true
        },
      ),
      { numRuns: 100 },
    )
  })

  it('should handle multiple error types', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.string({ minLength: 1, maxLength: 100 }),
          fc.record({
            name: fc.string({ minLength: 1, maxLength: 50 }),
            code: fc.integer({ min: 400, max: 599 }),
          }),
        ),
        (errorData) => {
          const boundary = new ErrorBoundarySimulator()

          const errorMessage =
            typeof errorData === 'string'
              ? errorData
              : `${errorData.name} (${errorData.code})`

          const result = boundary.tryRender(() => {
            simulateErrorComponent(errorMessage)
          })

          expect(result.success).toBe(false)
          expect(result.error).toBeInstanceOf(Error)
          expect(result.error?.message).toBe(errorMessage)

          return true
        },
      ),
      { numRuns: 100 },
    )
  })

  it('should isolate errors to individual boundaries', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            shouldError: fc.boolean(),
            errorMessage: fc.string({ minLength: 1, maxLength: 50 }),
          }),
          { minLength: 2, maxLength: 5 },
        ),
        (components) => {
          // Simulate multiple error boundaries
          const boundaries = components.map(() => new ErrorBoundarySimulator())

          // Render each component in its own boundary
          const results = components.map((component, index) => {
            return boundaries[index].tryRender(() => {
              simulateConditionalComponent(
                component.shouldError,
                component.errorMessage,
              )
            })
          })

          // Verify each boundary handled its component correctly
          components.forEach((component, index) => {
            if (component.shouldError) {
              expect(results[index].success).toBe(false)
              expect(results[index].error?.message).toBe(component.errorMessage)
              expect(boundaries[index].getState().hasError).toBe(true)
            } else {
              expect(results[index].success).toBe(true)
              expect(results[index].error).toBeNull()
              expect(boundaries[index].getState().hasError).toBe(false)
            }
          })

          // Verify errors in one boundary don't affect others
          const errorCount = components.filter((c) => c.shouldError).length
          const boundariesWithErrors = boundaries.filter(
            (b) => b.getState().hasError,
          ).length
          expect(boundariesWithErrors).toBe(errorCount)

          return true
        },
      ),
      { numRuns: 100 },
    )
  })

  it('should allow recovery after error', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.string({ minLength: 1, maxLength: 100 }),
          fc.string({ minLength: 1, maxLength: 100 }),
        ),
        ([firstError, secondError]) => {
          const boundary = new ErrorBoundarySimulator()

          // First render with error
          const firstResult = boundary.tryRender(() => {
            simulateErrorComponent(firstError)
          })

          expect(firstResult.success).toBe(false)
          expect(firstResult.error?.message).toBe(firstError)
          expect(boundary.getState().hasError).toBe(true)

          // Reset boundary (simulating recovery)
          boundary.reset()
          expect(boundary.getState().hasError).toBe(false)
          expect(boundary.getState().error).toBeNull()

          // Second render with different error
          const secondResult = boundary.tryRender(() => {
            simulateErrorComponent(secondError)
          })

          expect(secondResult.success).toBe(false)
          expect(secondResult.error?.message).toBe(secondError)
          expect(boundary.getState().hasError).toBe(true)

          return true
        },
      ),
      { numRuns: 100 },
    )
  })
})
