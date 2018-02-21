using Hatzloah.DAL;
using Hatzloah.Models;
using System.Linq;
using System.Web.Mvc;

namespace Hatzloah.Controllers
{
    public class HomeController : Controller
    {
        public HatzolahOrm orm;

        public HomeController(HatzolahOrm orm)
        {
            this.orm = orm;
        }

        public ActionResult Index()
        {
            var nocList = orm.NocCodes.Select(x => new { x.Id, x.Description, x.Noc}).ToDictionary(x => x.Id, x => x.Description + " NOC: " + x.Noc);
            return View("Index", nocList);
        }

        [HttpGet]
        public ActionResult GetNoc(string description)
        {
            if(description != null && description != string.Empty)
            {
                int id = 0;
                try
                {
                    id = int.Parse(description);
                }
                catch
                {
                    HatzolahNoc code = new HatzolahNoc
                    {
                        Tone = "Single Tone or use your own judgement",
                        Instructions = "Dispatch Two Units  or use your own judgement",
                        Noc = description
                    };

                    return PartialView("GetNoc", code);
                }
                var nocResult = orm.NocCodes.Select(x => new { x.Id, x.QuestionId, x.Instructions, x.Noc, x.CodeOneFlag, x.Tone }).Where(x => x.Id == id).FirstOrDefault();
                if(nocResult != null)
                {
                    var noc = new HatzolahNoc
                    {
                        Tone = nocResult.Tone,
                        CodeOneFlag = nocResult.CodeOneFlag,
                        Instructions = nocResult.Instructions,
                        Noc = nocResult.Noc
                    };

                    if (nocResult.QuestionId != null)
                    {
                        var nocQuestionResult = orm.Question.Select(x => new { x.Question, x.QuestionId }).Where(m => m.QuestionId == nocResult.QuestionId).FirstOrDefault();
                        if (nocQuestionResult != null)
                        {
                            noc.Question = nocQuestionResult.Question;
                        }
                    }
                    return PartialView("GetNoc", noc);
                }
                else
                {
                    return Json(new { Message = "There was an issue getting the correct noc. Please contact website administrator", Failure = true, JsonRequestBehavior.AllowGet });
                }
            }
            return Json(new {Message = "NOC Description Required", Failure = true, JsonRequestBehavior.AllowGet });
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpGet]
        public ActionResult PrintPdf(string text)
        {
            return null;
        }
    }
}