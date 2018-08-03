using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Hatzloah.DataAccess
{
    [Table("HatzolahNoc")]
    public class HatzolahNoc
    {
        public int Id { get; set; }

        [StringLength(50)]
        public string Tone { get; set; }

        [StringLength(50)]
        public string Noc { get; set; }

        [StringLength(500)]
        public string Instructions { get; set; }

        public int? QuestionId { get; set; }

        [StringLength(250)]
        public string Description { get; set; }

        public bool CodeOneFlag { get; set; }

        public string Question { get; set; }

    }
}