// @ts-check
import { test, expect } from '@playwright/test'

const LOCALHOST_URL = 'http://localhost:5173/'

test.beforeEach(async ({ page }) => {
  await page.goto(LOCALHOST_URL)
})

test.describe('Board', () => {
  test('should have 9 cells', async ({ page }) => {
    const cells = await page.locator('.tic-tac-toe--board > .tic-tac-toe--square')
    await expect(cells).toHaveCount(9)
  })
})
