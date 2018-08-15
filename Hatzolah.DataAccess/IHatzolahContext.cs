using Hatzloah.DataAccess;
using System;
using System.Collections.Generic;

namespace Hatzolah.DataAccess
{
    public interface IHatzolahContext
    {
        Dictionary<int, string> GetAllNocs();

        HatzolahNoc GetNoc(int id);

        HatzolahNoc GetDefaultNoc(string description);
    }
}
