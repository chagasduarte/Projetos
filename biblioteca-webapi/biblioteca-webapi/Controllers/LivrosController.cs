using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace biblioteca_webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LivrosController : ControllerBase
    {
        private readonly string _connectionString;
        public LivrosController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("biblioteca");
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            using (var sqlConnection = new SqlConnection(_connectionString))
            {
                const string sql = "SELECT * FROM livro";
                var livros = await sqlConnection.QueryAsync(sql);
                return Ok(livros);
            }
        }
    }
}
