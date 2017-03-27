using CMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace CMS.Controllers
{
    public class HomeController : Controller
    {
        private AristinoEntities db = new AristinoEntities();
        [Route]
        public ActionResult Index()
        {
            return View();
        }

        [Route("lien-he")]
        public ActionResult LienHe()
        {
            return View();
        }

        [Route("gioi-thieu")]
        public ActionResult GioiThieu()
        {
            return View();
        }
    }
}
