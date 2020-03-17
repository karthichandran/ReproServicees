using System;
using System.Collections.Generic;
using System.Text;

namespace ReProServices.Domain.Entities
{
    public class Property
    {
		public int PropertyID { get; set; }
		public int PropertyType { get; set; }
		public string AddressPremises { get; set; }
		public string AddressLine1 { get; set; }
		public string AddressLine2 { get; set; }
		public string City { get; set; }
		public string PinCode { get; set; }
		public decimal TdsInterestRate { get; set; }
		public DateTime LateFeeDay { get; set; }
		public int StateID { get; set; }
		public int GstTaxCode { get; set; }
		public int TDSTaxCode { get; set; }

		
	}
}
