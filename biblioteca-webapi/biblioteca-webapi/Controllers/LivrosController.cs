using biblioteca_webapi.Entities;
using biblioteca_webapi.Models;
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
                var livros = await sqlConnection.QueryAsync<Livros>(sql);
                return Ok(livros);
            }
        }
        
        [HttpPost]
        public async Task<IActionResult> Insert(LivroInputModel livro)
        {
            var parameters = new
            {
                livro.Nome,
                livro.Usuario,
                livro.Box,

            };
            using (var sqlConnection = new SqlConnection(_connectionString))
            {
                const string sql = "INSERT INTO [dbo].[livro] OUTPUT INSERTED.id_livro  VALUES (@nome,@usuario ,@box)";
                int id = await sqlConnection.ExecuteScalarAsync<int>(sql, parameters);
                return Ok(id);
            }
        }

    }
}
