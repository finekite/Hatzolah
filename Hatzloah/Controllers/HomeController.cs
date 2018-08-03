using Hatzolah.Domain.Services;
using System;
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
                var nocs  = hatzolahService.GetAllNocs();
                return View("Index", nocs);
            }
            catch (InvalidOperationException ex)
            {
                return View("Error", model: ex);
            }
        }

        [HttpGet]
        public ActionResult GetNoc(string description)
        {
            dynamic noc;

            try
            {
                if (!string.IsNullOrEmpty(description))
                {
                    if (int.TryParse(description, out int id))
                    {
                        noc = hatzolahService.GetNoc(id);
                    }
                    else
                    {
                        noc = hatzolahService.GetDefaultNoc(description);
                    }

                    if(noc != null)
                    {
                        return PartialView("GetNoc", noc);
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