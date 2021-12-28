using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AjaxCRUD.Models;

namespace AjaxCRUD.Controllers
{
    public class StudentController : Controller
    {
        StudentDB StuDb = new StudentDB();

        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(StuDb.ListAll(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(Studentmodel student )
        {
            return Json(StuDb.Add(student), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            var studentmodel = StuDb.ListAll().Find(x => x.id.Equals(ID));
            return Json(studentmodel, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Studentmodel student)
        {
            return Json(StuDb.Update(student), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(StuDb.Delete(ID), JsonRequestBehavior.AllowGet);
            
            //hi bro//
        }

    }
}