namespace LB3.Models
{
    public class Article
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public byte[] Image { get; set; }
        public string UserId { get; set; }
    }
}
