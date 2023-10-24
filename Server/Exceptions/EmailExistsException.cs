namespace Server.Exceptions
{
    public class EmailExistsException : Exception
    {
        public EmailExistsException() {}

        public EmailExistsException(string message) : base(message) {}

        public EmailExistsException(string message, Exception inner) : base(message, inner) {}
    }
}
