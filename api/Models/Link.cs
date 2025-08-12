using api.Utils.Constants;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using System.Text.Json.Serialization;
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
        [JsonIgnore]
        public string VisitorsIpJson
        {
            get => JsonSerializer.Serialize(VisitorsIp);
            set => VisitorsIp = string.IsNullOrEmpty(value)
                ? new Dictionary<string, int>()
                : JsonSerializer.Deserialize<Dictionary<string, int>>(value);
        }
        [NotMapped]
        public Dictionary<string, int> VisitorsIp { get; set; }

        public Link()
        {
            Created = DateTime.UtcNow;
            TimesOpened = 0;
            SecretURL = $"{Constants.SECRET_URL_NAME}/{Guid.NewGuid().ToString()}";
        }
    }
}
