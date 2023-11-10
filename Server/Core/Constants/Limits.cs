namespace Server.Core.Constants
{
    public static class Limits
    {
        public const int TAGS_LIMIT = 8;
        public const int NOTES_LIMIT = 64;
        public const int SESSIONS_LIMIT = 5;

        public const int USER_NAME_MAXLENGTH = 64;
        public const int USER_LOGIN_MAXLENGTH = 64;
        public const int USER_PASSWORD_MAXLENGTH = 128;

        public const int NOTE_NAME_MAXLENGTH = 32;
        public const int NOTE_CONTENT_MAXLENGTH = 1024;

        public const int TAG_NAME_MAXLENGTH = 32;
    }
}
