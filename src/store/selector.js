export const finalPaymentSelector = state => {
  const recommend = {
    recommend: 'unApplied'
  };
  const priceObject = {
    totalPrice: 0,
    rateDiscountPrice: 0,
    amountDiscountPrice: 0
  };
  const paymentData = state.cart.paymentCartedItems;
  const all_coupons = state.coupons.all_coupons.data;
  let discountRate = '';
  let discountAmount = '';

  if (all_coupons && paymentData) {
    all_coupons.map(coupon => {
      if (coupon.type === 'rate') {
        return (discountRate = coupon.discountRate);
      } else if (coupon.type === 'amount') {
        return (discountAmount = coupon.discountAmount);
      }
      return all_coupons;
    });

    paymentData.map(product => {
      // 수량 정의
      const quantity = product.quantity.quantity;

      // 전체 금액
      priceObject.totalPrice += product.price * quantity;

      // 쿠폰 금액 계산
      if (product.availableCoupon !== false) {
        priceObject.rateDiscountPrice += Math.floor(
          (product.price * quantity * discountRate) / 100
        );
        priceObject.amountDiscountPrice = discountAmount;
      }
      if (priceObject.rateDiscountPrice > priceObject.amountDiscountPrice) {
        recommend.recommend = 'rate';
      }
      if (
        priceObject.rateDiscountPrice !== 0 &&
        priceObject.rateDiscountPrice <= priceObject.amountDiscountPrice // 두 값이 같은 경우 'amount'로 처리한다
      ) {
        recommend.recommend = 'amount';
      }
      return paymentData;
    });
  }

  return { paymentData: priceObject, recommend };
};
