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

  test('should have 9 empty cells', async ({ page }) => {
    const cells = await page.locator('.tic-tac-toe--board > .tic-tac-toe--square')
    const cellsCount = await cells.count()

    const firstCell = await cells.first()
    await firstCell.click()
    const cellImage = await firstCell.locator('img')
    await expect(cellImage).toBeVisible()

    for (let i = 0; i < cellsCount; i++) {
      const cell = await cells.nth(i)
      await expect(cell).toBeEmpty()

      // const cellPlayerImage = await cell.locator('img')
      // await expect(cellPlayerImage).not.toBeVisible()
    }
  })
})
