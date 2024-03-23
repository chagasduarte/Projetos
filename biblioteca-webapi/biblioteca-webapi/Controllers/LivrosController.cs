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
        public async Task<IActionResult> Insert([FromBody] LivroInputModel livro)
        {
            var parameters = new
            {
                livro.Nome,
                livro.Usuario,
                livro.Box
            };
            using (var sqlConnection = new SqlConnection(_connectionString))
            {
                const string sql = "INSERT INTO [dbo].[livro] OUTPUT INSERTED.id_livro  VALUES (@nome,@usuario ,@box, 0, null)";
                int id = await sqlConnection.ExecuteScalarAsync<int>(sql, parameters);
                return Ok(id);
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateStatus([FromBody]int id)
        {
            var parameters = new
            {
                id = id
            };
            using (var sqlConnection = new SqlConnection(_connectionString))
            {
                const string sql = "UPDATE [dbo].[livro] " +
                                   "SET [status] = [status] + 1 " +
                                   "WHERE [id_livro] = @id and [status] < 3";
                var livros = await sqlConnection.ExecuteScalarAsync(sql, parameters);
                return Ok();
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLivro(int id)
        {
            var parameters = new
            {
                id = id
            };
            using (var sqlConnection = new SqlConnection(_connectionString))
            {
                const string sql = "DELETE FROM livro WHERE id_livro = @id";
                await sqlConnection.ExecuteScalarAsync(sql, parameters);
                return Ok();
            }
        }

    }
}
