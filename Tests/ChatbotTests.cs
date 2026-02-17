using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;
using NUnit.Framework;
using ChatbotTesting.Config;
using ChatbotTesting.Pages;
using ChatbotTesting.Helpers;

namespace ChatbotTesting.Tests
{
    /// <summary>
    /// Main test suite for chatbot portal
    /// Tests the manual login flow and chat page functionality
    /// </summary>
    [Parallelizable(ParallelScope.Self)]
    [TestFixture]
    public class ChatbotTests : PageTest
    {
        [Test]
        public async Task ShouldAllowManualLoginAndVerifyChatPageLoads()
        {
            // Initialize helpers
            var loginHelper = new ManualLoginHelper(Page);
            var chatPage = new ChatPage(Page);

            // Step 1: Navigate and pause for manual login
            Console.WriteLine("\n=== STEP 1: Manual Login ===");
            await loginHelper.WaitForManualLoginWithValidationAsync(
                TestConfig.ChatURL,
                TestConfig.Patterns.ChatUrl
            );

            // Step 2: Validate chat page is loaded
            Console.WriteLine("\n=== STEP 2: Validate Chat Page ===");
            
            // Check URL contains /portal/chat/
            await chatPage.WaitForPageLoadAsync();
            Console.WriteLine("✓ URL validation passed");
            
            // Check chat input is visible
            await chatPage.AssertChatInputVisibleAsync();
            Console.WriteLine("✓ Chat input is visible");
            
            Console.WriteLine("\n✅ Test passed! Chat page is ready for interaction.");

            // Optional: Take a screenshot of the loaded page
            await Page.ScreenshotAsync(new PageScreenshotOptions
            {
                Path = "TestResults/chat-page-loaded.png",
                FullPage = true
            });
            Console.WriteLine("📸 Screenshot saved: TestResults/chat-page-loaded.png");
        }
    }
}
