using Microsoft.Playwright;
using ChatbotTesting.Config;

namespace ChatbotTesting.Helpers
{
    /// <summary>
    /// Helper for manual login flow
    /// Provides utilities to pause test execution for manual login
    /// </summary>
    public class ManualLoginHelper
    {
        private readonly IPage _page;

        public ManualLoginHelper(IPage page)
        {
            _page = page;
        }

        /// <summary>
        /// Navigate to the target URL and pause for manual login
        /// </summary>
        /// <param name="targetUrl">The URL to navigate to</param>
        public async Task<string> WaitForManualLoginAsync(string targetUrl)
        {
            // Navigate to target URL
            Console.WriteLine($"\n🌐 Navigating to: {targetUrl}");
            await _page.GotoAsync(targetUrl);

            var currentUrl = _page.Url;
            
            // Check if we're on a login page
            var isLoginPage = TestConfig.Patterns.LoginUrl.IsMatch(currentUrl) || 
                            currentUrl != targetUrl;

            if (isLoginPage)
            {
                Console.WriteLine("🔐 Login page detected.");
            }
            else
            {
                Console.WriteLine("ℹ️  Checking for login requirements...");
            }

            // Pause for manual login
            Console.WriteLine("\n⏸️  PAUSED for manual login.");
            Console.WriteLine("📋 Instructions:");
            Console.WriteLine("   1. Use the Playwright Inspector to fill in login credentials");
            Console.WriteLine("   2. Complete the login process manually");
            Console.WriteLine("   3. Click the \"Resume\" button in the Playwright Inspector");
            Console.WriteLine("   4. The test will continue automatically\n");

            // Pause execution - user must resume manually
            await _page.PauseAsync();

            Console.WriteLine("▶️  Resumed! Verifying login success...");
            
            // Wait for network to settle after login
            try
            {
                await _page.WaitForLoadStateAsync(LoadState.NetworkIdle);
            }
            catch
            {
                // Fallback if networkidle doesn't work
                Console.WriteLine("Network idle timeout, continuing...");
            }

            var finalUrl = _page.Url;
            Console.WriteLine($"✓ Current URL after login: {finalUrl}");
            
            return finalUrl;
        }

        /// <summary>
        /// Wait for manual login with validation
        /// </summary>
        /// <param name="targetUrl">The URL to navigate to</param>
        /// <param name="expectedUrlPattern">Pattern that URL should match after login</param>
        public async Task WaitForManualLoginWithValidationAsync(string targetUrl, System.Text.RegularExpressions.Regex expectedUrlPattern)
        {
            await WaitForManualLoginAsync(targetUrl);
            
            // Validate we reached the expected page
            var currentUrl = _page.Url;
            
            if (!expectedUrlPattern.IsMatch(currentUrl))
            {
                throw new Exception($"URL after login ({currentUrl}) does not match expected pattern");
            }
            
            Console.WriteLine("✓ Login validation passed!");
        }

        /// <summary>
        /// Check if currently on a login page
        /// </summary>
        public bool IsOnLoginPage()
        {
            var currentUrl = _page.Url;
            return TestConfig.Patterns.LoginUrl.IsMatch(currentUrl);
        }

        /// <summary>
        /// Take a screenshot for debugging
        /// </summary>
        /// <param name="name">Name for the screenshot</param>
        public async Task<string> TakeDebugScreenshotAsync(string name = "debug")
        {
            var timestamp = DateTime.Now.ToString("yyyyMMddHHmmss");
            var filename = $"screenshot-{name}-{timestamp}.png";
            await _page.ScreenshotAsync(new PageScreenshotOptions 
            { 
                Path = filename, 
                FullPage = true 
            });
            Console.WriteLine($"📸 Screenshot saved: {filename}");
            return filename;
        }
    }
}
