using System.Web;
using System.Web.Mvc;

namespace Hatzloah.Domain.DTO
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
