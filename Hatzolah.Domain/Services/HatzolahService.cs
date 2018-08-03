using Hatzloah.DataAccess;
using Hatzloah.DataAccess.DAL;
using Hatzolah.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Hatzolah.Domain.Services
{
    public class HatzolahService : IHatzolahService
    {
        public IHatzolahContext hatzolahContext;

        public HatzolahService(IHatzolahContext hatzolahContext)
        {
            this.hatzolahContext = hatzolahContext;
        }

        public Dictionary<int, string> GetAllNocs()
        {
            return hatzolahContext.GetAllNocs();
        }

        public HatzolahNoc GetDefaultNoc(string description)
        {
            return hatzolahContext.GetDefaultNoc(description);
        }

        public HatzolahNoc GetNoc(int id)
        {
            return hatzolahContext.GetNoc(id);
        }
    }
}