using Hatzloah.DataAccess;
using Hatzloah.DataAccess.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Hatzolah.DataAccess
{
    public class HatzolahContext : IHatzolahContext
    {
        private string connectionString;

        public HatzolahContext(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public Dictionary<int, string> GetAllNocs()
        {
            using (HatzolahOrm orm = new HatzolahOrm(connectionString))
            {
                var nocList = orm.NocCodes.ToDictionary(x => x.Id, x => x.Description + " NOC: " + x.Noc);

                return nocList;
            }
        }

        public HatzolahNoc GetDefaultNoc(string description)
        {
            HatzolahNoc noc = new HatzolahNoc
            {
                Tone = "Single Tone or use your own judgement",
                Instructions = "Dispatch Two Units  or use your own judgement",
                Noc = description
            };

            return noc;
        }

        public HatzolahNoc GetNoc(int id)
        {
            var orm = new HatzolahOrm(connectionString);
            var noc = orm.NocCodes.Where(x => x.Id == id).FirstOrDefault();

            if (noc != null)
            {
                var nocMapped = MapNoc(noc);

                if (noc.QuestionId != null)
                {
                    GetNocQuestion(orm, nocMapped);
                }

                return nocMapped;
            }

            return noc;
        }

        private void GetNocQuestion(HatzolahOrm orm, HatzolahNoc noc)
        {
            var nocQuestionResult = orm.Question.Select(x => new { x.Question, x.QuestionId }).Where(m => m.QuestionId == noc.QuestionId).FirstOrDefault();
            if (nocQuestionResult != null)
            {
                noc.Question = nocQuestionResult.Question;

            }
        }

        private HatzolahNoc MapNoc(HatzolahNoc noc)
        {
            var hatzolahNoc = new HatzolahNoc();
            hatzolahNoc.Tone = noc.Tone;
            hatzolahNoc.CodeOneFlag = noc.CodeOneFlag;
            hatzolahNoc.Instructions = noc.Instructions;
            hatzolahNoc.Noc = noc.Noc;

            return noc;
        }
    }
}