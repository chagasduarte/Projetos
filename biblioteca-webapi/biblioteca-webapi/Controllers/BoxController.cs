using biblioteca_webapi.Entities;
using biblioteca_webapi.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace biblioteca_webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoxController : ControllerBase
    {
        private readonly string _connectionString;
        public BoxController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("biblioteca");
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            using (var sqlConnection = new SqlConnection(_connectionString))
            {
                const string sql = "SELECT * FROM box";
                IEnumerable<Box> boxs = await sqlConnection.QueryAsync<Box>(sql);
                List<BoxOutputModel> output = new List<BoxOutputModel>();
                foreach(Box box in boxs)
                {
                    var parameters = new
                    {
                        box = box.id_box
                    };
                   
                    const string sqlLivros = "SELECT " +
                                                "[id_livro]," +
                                                "[nome_livro]," +
                                                "[usuario_livro]," +
                                                "[box_livro], " +
                                                "case when [status] = 0 then 'Leitura ainda não iniciada' " +
                                                "when [status] = 1 then 'Leitura Iniciada'  " +
                                                "when [status] = 2 then 'Leitura Concluida' end [status]," +
                                                "[descricao]" +
                                            "FROM livro WHERE box_livro = @box";
                    
                    BoxOutputModel outputModel = new BoxOutputModel();
                    outputModel.id_box = box.id_box;
                    outputModel.nome_box = box.nome_box;
                    outputModel.Livros = await sqlConnection.QueryAsync<Livros>(sqlLivros, parameters);
                    output.Add(outputModel);
                }
                return Ok(output);
            }
        }


        [HttpPost]
        public async Task<IActionResult> Insert([FromBody] BoxInputmodel nome)
        {
            var parameters = new
            {
                nome = nome.nome
            };
            using (var sqlConnection = new SqlConnection(_connectionString))
            {
                const string sql = "INSERT INTO [dbo].[box] OUTPUT INSERTED.id_box  VALUES (@nome)";
                int id = await sqlConnection.ExecuteScalarAsync<int>(sql, parameters);
                return Ok(id);
            }
        }

    }
}
