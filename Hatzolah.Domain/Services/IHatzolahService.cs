using Hatzloah.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hatzolah.Domain.Services
{
    public interface IHatzolahService
    {
        Dictionary<int, string> GetAllNocs();

        HatzolahNoc GetNoc(int id);

        HatzolahNoc GetDefaultNoc(string description);
    }
}
