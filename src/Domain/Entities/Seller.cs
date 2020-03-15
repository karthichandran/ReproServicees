using ReProServices.Domain.Common;


namespace ReProServices.Domain.Entities
{
    public class Seller : AuditableEntity
	{
		public int SellerID { get; set; }
		public string SellerName { get; set; }
		public string AddressPremises { get; set; }
		public string AdressLine1 { get; set; }
		public string AddressLine2 { get; set; }
		public string City { get; set; }
		public string PinCode { get; set; }
		public string EmailID { get; set; }
		public string PAN { get; set; }
		public string MobileNo { get; set; }
		public int StateID { get; set; }
	}
}
