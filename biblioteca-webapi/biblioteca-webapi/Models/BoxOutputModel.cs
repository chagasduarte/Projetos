using biblioteca_webapi.Entities;

namespace biblioteca_webapi.Models
{
    public class BoxOutputModel : Box
    {
        public IEnumerable<Livros> Livros { get; set; } = new List<Livros>();
    }
}
