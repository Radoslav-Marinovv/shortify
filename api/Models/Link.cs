using System.ComponentModel.DataAnnotations;
using api.Utils.Constants;
namespace api.Models
{
    public class Link
    {
        [Key]
        public string Id { get; set; }
        [Required]
        [MinLength(Constants.MIN_LENGTH_URL)]
        public string OriginalURL { get; set; }
        public string SecretURL { get; set; }
        public DateTime Created { get; set; }
        public int TimesOpened { get; set; }
        public Dictionary<string,int> VisitorsIp { get; set; }

        public Link()
        {
            Created = DateTime.UtcNow;
            TimesOpened = 0;
            SecretURL = $"{Constants.SECRET_URL_NAME}/{Guid.NewGuid().ToString()}";
        }
    }
}
