using Microsoft.AspNetCore.Mvc;
using api.Database;
using api.Models;
using api.Utils.Constants;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LinksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LinksController(ApplicationDbContext context)
        {
            _context = context;
        }

        private BadRequestObjectResult? ValidateLink(string OriginalURL)
        {
            if (string.IsNullOrEmpty(OriginalURL))
            {
                return BadRequest("URL is empty");
            }

            if (OriginalURL.Length < Constants.MIN_LENGTH_URL)
            {
                return BadRequest($"URL must be at least {Constants.MIN_LENGTH_URL} symbols");
            }

            if (!Uri.IsWellFormedUriString(OriginalURL, UriKind.Absolute))
            {
                return BadRequest("Invalid URL");
            }
            return null;
        }
        private BadRequestObjectResult? ValidateLinkId(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Id is Null or Empty");
            }

            return null;
        }

        private string GetClientIp()
        {
            var ipAddress = HttpContext.Request.Headers["X-Forwarded-For"].FirstOrDefault();

            if (string.IsNullOrEmpty(ipAddress))
            {
                ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
            }
            return ipAddress ?? "Unknown";
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var allLinks = await _context.Links.ToListAsync();

            return Ok(allLinks);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetShortLinkById([FromRoute] string id)
        {
            var isValid = ValidateLinkId(id);
            if (isValid != null)
            {
                return isValid;
            }

            try
            {
                var link = await _context.Links.FindAsync(id);

                if (link == null)
                {
                    return NotFound("Short URL not found");
                }

                link.TimesOpened++;

                var clientIp = GetClientIp();
                if (link.VisitorsIp.ContainsKey(clientIp))
                {
                    link.VisitorsIp[clientIp]++;
                }
                else
                {
                    link.VisitorsIp.Add(clientIp, 1);
                }

                _context.Links.Update(link);

                await _context.SaveChangesAsync();

                return Ok(new { originalUrl = link.OriginalURL });
            }
            catch (Exception exception)
            {
                return BadRequest($"Error retrieving short URL: {exception.Message}");
            }
        }

        [HttpPost("Secret")]
        public async Task<IActionResult> GetSecretLinkById([FromBody] string id)
        {
            var isValid = ValidateLinkId(id);
            if (isValid != null)
            {
                return isValid;
            }

            try
            {
                var link = await _context.Links.FirstOrDefaultAsync<Link>(link => link.SecretURL == id);

                if (link == null)
                {
                    return NotFound("Short URL not found");
                }
                
                return Ok(new { originalURL = link.OriginalURL, shortURL = link.Id, visitorsIp = link.VisitorsIp });
            }
            catch (Exception exception)
            {
                return BadRequest($"Error retrieving short URL: {exception.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateLink([FromBody] string URL)
        {
            var isValid = ValidateLink(URL);
            if (isValid != null)
            {
                return isValid;
            }

            try
            {
                var clientIp = GetClientIp();

                Link newLink = new Link
                {
                    Id = Guid.NewGuid().ToString(),
                    OriginalURL = URL,
                    SecretURL = Guid.NewGuid().ToString(),
                    VisitorsIp = new Dictionary<string, int>(),
                };
                newLink.VisitorsIp.Clear();

                _context.Links.Add(newLink);
                await _context.SaveChangesAsync();
                return Ok(new { originalURL = newLink.OriginalURL, shortURL = newLink.Id, secretURL = newLink.SecretURL });
            }
            catch (Exception exeption)
            {
                return BadRequest($"Error creating short URL: {exeption.Message}");
            }
        }

    }
}
