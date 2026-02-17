using System.Text.RegularExpressions;

namespace ChatbotTesting.Config
{
    /// <summary>
    /// Test configuration settings
    /// </summary>
    public static class TestConfig
    {
        /// <summary>
        /// Base URL for the application
        /// </summary>
        public static string BaseURL => "https://gsassistant-hec2cvcsbnf6a2bx.eastus-01.azurewebsites.net";

        /// <summary>
        /// Conversation ID to use in tests
        /// </summary>
        public static string ConversationId => "conv_66aca917e2a344fb";

        /// <summary>
        /// Full chat URL
        /// </summary>
        public static string ChatURL => $"{BaseURL}/portal/chat/{ConversationId}";

        /// <summary>
        /// Timeout values in milliseconds
        /// </summary>
        public static class Timeouts
        {
            public static int Test => 120000;           // 2 minutes per test
            public static int Action => 30000;          // 30 seconds for actions
            public static int Navigation => 60000;      // 60 seconds for page loads
            public static int Login => 300000;          // 5 minutes for manual login
            public static int ElementVisibility => 5000; // 5 seconds to check element visibility
            public static int QuickCheck => 1000;       // 1 second for quick checks
        }

        /// <summary>
        /// URL patterns for validation
        /// </summary>
        public static class Patterns
        {
            public static Regex ChatUrl => new Regex(@"/portal/chat/", RegexOptions.IgnoreCase);
            public static Regex LoginUrl => new Regex(@"login|auth|signin", RegexOptions.IgnoreCase);
        }
    }
}
