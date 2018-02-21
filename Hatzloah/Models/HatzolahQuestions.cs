using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hatzloah.Models
{
    [Table("HatzolahQuestions")]
    public class HatzolahQuestions
    {
        [StringLength(450)]
        public string Question { get; set; }
        [Key]
        public int QuestionId { get; set; }
    }
}