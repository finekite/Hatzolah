using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Hatzloah.Models
{
    public class HtmlTemplateUrls
    {
        public string AddResponderUrl
        {
            get
            {
#if DEBUG
                return ConfigurationManager.AppSettings["AddResponderTemplateUrlDev"];
#else
                return ConfigurationManager.AppSettings["AddResponderTemplateUrlProd"];
#endif
            }
        }

        public string ResponderInfoUrl
        {
            get
            {
#if DEBUG
                return ConfigurationManager.AppSettings["ResponderInfoTemplateDev"];
#else
                return ConfigurationManager.AppSettings["ResponderInfoTemplateProd"];
#endif
            }
        }

        public string AdditionalResponderUrl
        {
            get
            {
#if DEBUG
                return ConfigurationManager.AppSettings["AdditionalResponderTemplateDev"];
#else
                return ConfigurationManager.AppSettings["AdditionalResponderTemplateProd"];
#endif
            }
        }
    }
}