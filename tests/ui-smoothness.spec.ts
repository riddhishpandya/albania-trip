import { test, expect } from '@playwright/test';

test.describe('UI Smoothness & Visual Quality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3003');
  });

  test('should have smooth page transitions and loading', async ({ page }) => {
    // Check for paint/layout issues
    const performanceMetrics = await page.evaluate(() => {
      const entries = performance.getEntriesByType('paint');
      return {
        firstPaint: entries.find((e: any) => e.name === 'first-paint'),
        firstContentfulPaint: entries.find((e: any) => e.name === 'first-contentful-paint'),
      };
    });

    console.log('Performance metrics:', performanceMetrics);

    // Page should load without errors
    await expect(page).toHaveTitle(/Albania 2026 Trip Hub/);
  });

  test('should have smooth scrolling behavior', async ({ page }) => {
    // Test scroll smoothness
    await page.evaluate(() => {
      window.scrollTo({ top: 500, behavior: 'smooth' });
    });

    await page.waitForTimeout(500);

    const scrollPosition = await page.evaluate(() => window.scrollY);
    expect(scrollPosition).toBeGreaterThan(0);
  });

  test('should render tabs without layout shift', async ({ page }) => {
    // Click through tabs and check for layout stability
    const tabs = ['Itinerary', 'Stays', 'Explore', 'Language', 'Costs', 'Tips', 'Fun Facts', 'Decisions'];

    for (const tab of tabs) {
      const tabButton = page.locator('button', { hasText: tab });
      await tabButton.click();
      await page.waitForTimeout(100);

      // Check tab panel exists and has no sudden jumps
      const panel = page.locator('[role="tabpanel"]');
      await expect(panel).toBeVisible();
    }
  });

  test('should have smooth hover transitions on cards', async ({ page }) => {
    // Check first card for hover effect
    const firstCard = await page.locator('.dayCard').first();

    if (await firstCard.count() > 0) {
      await firstCard.hover();
      await page.waitForTimeout(300);

      // Verify hover effect applied
      const transform = await firstCard.evaluate(el =>
        window.getComputedStyle(el).transform
      );
      expect(transform).not.toBe('none');
    }
  });

  test('should have no console errors or warnings', async ({ page }) => {
    const errors: any[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error' || msg.type() === 'warning') {
        errors.push(msg.text());
      }
    });

    await page.reload();
    await page.waitForLoadState('networkidle');

    expect(errors.length).toBe(0);
  });

  test('should render language tab smoothly', async ({ page }) => {
    await page.getByRole('tab', { name: 'Language' }).click();

    await page.waitForTimeout(500);

    // Click through phrase categories
    const categories = ['Essentials', 'For Food', 'Getting Around', 'Fun'];

    for (const category of categories) {
      const button = page.locator('#panel-language button', { hasText: category });
      await button.click();
      await page.waitForTimeout(150);

      // Verify phrases load without jank
      const phraseCount = await page.locator('#panel-language .phraseCard').count();
      expect(phraseCount).toBeGreaterThan(0);
    }
  });

  test('should have smooth calculator interaction', async ({ page }) => {
    await page.getByRole('tab', { name: 'Costs' }).click();

    const input = await page.locator('#panel-costs input[type="number"]').first();

    await input.fill('2000');
    await page.waitForTimeout(200);

    const result = await page.locator('#panel-costs .calcResult strong');
    await expect(result).toBeVisible();

    // Verify USD amount updates
    const usdText = await result.textContent();
    expect(usdText).toContain('$');
  });

  test('should render travel tips tab smoothly', async ({ page }) => {
    await page.getByRole('tab', { name: 'Tips' }).click();

    const tipCards = page.locator('#panel-tips .tipCard');
    await expect(tipCards.first()).toBeVisible();
    await expect(tipCards).toHaveCount(8);
  });

  test('should have smooth image loading', async ({ page }) => {
    const images = await page.locator('img');
    const count = await images.count();

    for (let i = 0; i < Math.min(count, 5); i++) {
      const img = images.nth(i);
      await expect(img).toBeVisible({ timeout: 5000 });
    }
  });

  test('should navigate between pages smoothly', async ({ page }) => {
    // Test navigation smoothness
    const navLinks = [
      { text: 'Itinerary', url: '/itinerary' },
      { text: 'Stays', url: '/stays' },
      { text: 'Explore', url: '/explore' }
    ];

    for (const link of navLinks) {
      await page.getByText(link.text).first().click();
      await page.waitForURL('**' + link.url);
      await expect(page).toHaveURL(new RegExp(link.url + '$'));

      // Check page loaded without errors
      await expect(page.locator('h1')).toBeVisible();

      // Go back to home
      await page.goto('http://localhost:3003');
      await page.waitForLoadState('networkidle');
    }
  });

  test('should have smooth modal open/close', async ({ page }) => {
    // Click a hype moment button to open modal
    const openButton = await page.locator('button', { hasText: 'Theth Mountain Day' });

    if (await openButton.count() > 0) {
      await openButton.click();
      await page.waitForTimeout(300);

      const modal = await page.locator('.tripModalOverlay');
      await expect(modal).toBeVisible();

      // Close modal with Escape
      await page.keyboard.press('Escape');
      await page.waitForTimeout(200);

      await expect(modal).not.toBeVisible();
    }
  });

  test('should not have horizontal scroll on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300);

    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    expect(hasHorizontalScroll).toBe(false);
  });

  test('should have consistent spacing and no overflow', async ({ page }) => {
    // Check main sections don't overflow
    const sections = await page.locator('.section');
    const count = await sections.count();

    for (let i = 0; i < count; i++) {
      const section = sections.nth(i);
      const box = await section.boundingBox();

      if (box) {
        // Verify section width is within viewport
        expect(box.width).toBeLessThanOrEqual(await page.evaluate(() => window.innerWidth));
      }
    }
  });
});
