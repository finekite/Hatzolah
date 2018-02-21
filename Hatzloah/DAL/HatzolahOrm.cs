using Hatzloah.Models;
using System.Data.Entity;

namespace Hatzloah.DAL
{
    public class HatzolahOrm : DbContext
    {
        public HatzolahOrm(string connectionString) : base(connectionString)
        {

        }

        public DbSet<HatzolahNoc> NocCodes { get; set; }

        public DbSet<HatzolahQuestions> Question { get; set; }

    }
}