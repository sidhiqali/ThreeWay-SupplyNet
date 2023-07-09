
import MessageSection from '../components/MessageSection';
import OrderSection from '../components/OrderSection';
import Footer from '../components/Footer';

const Manufacturer = () => {
  return (
    <>
      <div className='min-h-[calc(100vh-136px)] bg-main bg-cover bg-no-repeat'>
        <div className='sections flex flex-col md:flex-row '>
          <div className='order-sec  w-full md:w-[60%] lg:w-[70%]  py-8 px-14'>
            <OrderSection />
          </div>
          <div className='message-sec w-full md:w-[40%] lg:w-[30%]  md:py-24 lg:py-20 px-14'>
            <MessageSection />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Manufacturer;
