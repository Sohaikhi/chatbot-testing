using Microsoft.Playwright;
using ChatbotTesting.Config;

namespace ChatbotTesting.Pages
{
    /// <summary>
    /// Page Object for the Chat page
    /// Encapsulates selectors and interactions for the chatbot portal
    /// </summary>
    public class ChatPage
    {
        private readonly IPage _page;
        
        // Chat input selectors - try multiple strategies
        private readonly string[] _chatInputSelectors = new[]
        {
            "[data-testid=\"chat-input\"]",           // Preferred: data-testid
            "textarea[placeholder*=\"message\"]",      // Fallback: textarea with message placeholder
            "input[type=\"text\"][placeholder*=\"message\"]", // Fallback: text input
            "textarea",                                 // Last resort: any textarea
            "input[type=\"text\"]"                     // Last resort: any text input
        };
        
        // Send button selectors
        private readonly string[] _sendButtonSelectors = new[]
        {
            "[data-testid=\"send-button\"]",
            "button[type=\"submit\"]",
            "button[aria-label*=\"send\" i]",
            "button:has-text(\"Send\")"
        };

        public ChatPage(IPage page)
        {
            _page = page;
        }

        /// <summary>
        /// Navigate to the chat page
        /// </summary>
        /// <param name="conversationId">Optional conversation ID (defaults to value from config)</param>
        public async Task GoToAsync(string? conversationId = null)
        {
            conversationId ??= TestConfig.ConversationId;
            var url = $"/portal/chat/{conversationId}";
            await _page.GotoAsync(url);
        }

        /// <summary>
        /// Wait for the chat page to be fully loaded
        /// Validates URL and checks for key elements
        /// </summary>
        public async Task WaitForPageLoadAsync()
        {
            // Wait for URL to contain /portal/chat/
            await _page.WaitForURLAsync(TestConfig.Patterns.ChatUrl, 
                new PageWaitForURLOptions { Timeout = TestConfig.Timeouts.Navigation });
            
            // Verify URL matches expected pattern
            var currentUrl = _page.Url;
            if (!TestConfig.Patterns.ChatUrl.IsMatch(currentUrl))
            {
                throw new Exception($"URL {currentUrl} does not match expected pattern");
            }
        }

        /// <summary>
        /// Find and return the chat input element
        /// Tries multiple selector strategies
        /// </summary>
        public async Task<ILocator> GetChatInputAsync()
        {
            foreach (var selector in _chatInputSelectors)
            {
                try
                {
                    var element = _page.Locator(selector).First;
                    var isVisible = await element.IsVisibleAsync(
                        new LocatorIsVisibleOptions { Timeout = TestConfig.Timeouts.ElementVisibility });
                    
                    if (isVisible)
                    {
                        return element;
                    }
                }
                catch
                {
                    // Try next selector
                    continue;
                }
            }
            
            throw new Exception("Could not find chat input element. Please update selectors in ChatPage.");
        }

        /// <summary>
        /// Validate that the chat input is visible
        /// </summary>
        public async Task AssertChatInputVisibleAsync()
        {
            var chatInput = await GetChatInputAsync();
            await Assertions.Expect(chatInput).ToBeVisibleAsync();
        }

        /// <summary>
        /// Type a message in the chat input
        /// </summary>
        /// <param name="message">The message to type</param>
        public async Task TypeMessageAsync(string message)
        {
            var chatInput = await GetChatInputAsync();
            await chatInput.FillAsync(message);
        }

        /// <summary>
        /// Send a message (type and submit)
        /// </summary>
        /// <param name="message">The message to send</param>
        public async Task SendMessageAsync(string message)
        {
            await TypeMessageAsync(message);
            
            // Try to find and click send button
            foreach (var selector in _sendButtonSelectors)
            {
                try
                {
                    var button = _page.Locator(selector).First;
                    var isVisible = await button.IsVisibleAsync(
                        new LocatorIsVisibleOptions { Timeout = TestConfig.Timeouts.QuickCheck });
                    
                    if (isVisible)
                    {
                        await button.ClickAsync();
                        return;
                    }
                }
                catch
                {
                    continue;
                }
            }
            
            // Fallback: press Enter
            var chatInput = await GetChatInputAsync();
            await chatInput.PressAsync("Enter");
        }

        /// <summary>
        /// Get all selectors for inspection
        /// Useful for debugging and selector discovery
        /// </summary>
        public Dictionary<string, string[]> GetAllSelectors()
        {
            return new Dictionary<string, string[]>
            {
                { "chatInput", _chatInputSelectors },
                { "sendButton", _sendButtonSelectors }
            };
        }
    }
}
