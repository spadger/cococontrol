using System.Web.Mvc;
using CocoCommand.Hubs;

namespace CocoCommand.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.CurrentLevel = CocoCommandHub.CurrentStatus;
            return View();
        }

        public ActionResult Admin()
        {
            ViewBag.CurrentLevel = CocoCommandHub.CurrentStatus;
            return View();
        }
    }
}
