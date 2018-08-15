using Hatzloah.Models;
using Hatzolah.Domain.Services;
using System;
using System.Linq;
using System.Web.Mvc;

namespace Hatzloah.Domain.DTO.Controllers
{
    public class HomeController : Controller
    {
        private IHatzolahService hatzolahService;

        public HomeController(IHatzolahService hatzolahService)
        {
            this.hatzolahService = hatzolahService;
        }

        public ActionResult Index()
        {
            try
            {
                var nocs  = hatzolahService.GetAllNocs().Select(x => x.Key + ". " + x.Value).ToArray();
                return View("Index", nocs);
            }
            catch (InvalidOperationException ex)
            {
                return View("Error", model: ex);
            }
        }

        [HttpGet]
        [Route("{nocId}")]
        public ActionResult GetNoc(string nocId)
        {
            var model = new HatzolahNocModel();

            try
            {
                if (!string.IsNullOrEmpty(nocId))
                {
                    if (int.TryParse(nocId, out int id))
                    {
                        model.HatzolahNoc = hatzolahService.GetNoc(id);
                    }
                    else
                    {
                        model.HatzolahNoc = hatzolahService.GetDefaultNoc(nocId);
                    }

                    if(model.HatzolahNoc != null)
                    {
                        return PartialView("GetNoc", model);
                    }
                    else
                    {
                        throw new InvalidOperationException();
                    }
                }
                return Json(new { Message = "NOC Description Required", Failure = true, JsonRequestBehavior.AllowGet });
            }
            catch(Exception ex)
            {
                return Json(new { Message = "There was an issue getting the correct noc. Please contact website administrator or try again", Failure = true, JsonRequestBehavior.AllowGet });
            }
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