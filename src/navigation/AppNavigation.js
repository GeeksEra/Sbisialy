import {
    createStackNavigator,
    createAppContainer
} from 'react-navigation';
import Splash from '../screens/other/Splash';
import BottomTabNavigator from './TabNavigator';
// import shopsOrReqturentsCategory from '../screens/home/bottoms/pages/shopsOrReqturentsCategory';
// import shopsOrReqturents from '../screens/home/bottoms/pages/shopsOrReqturents';
// // import CategoriesProductsList from '../screens/home/bottoms/pages/CategoriesProductsList';
// import AddAddress from '../screens/home/bottoms/pages/AddAddress';
// import AddressBook from '../screens/home/bottoms/pages/addressBook';
// import Checkout from '../screens/home/bottoms/pages/checkout';
// import Payment from '../screens/home/bottoms/pages/Payment';

// // import FarmerDetails from '../screens/home/pages/FarmerDetails';
// import wishlist from '../screens/home/bottoms/wishlist';
import About from '../screens/home/bottoms/pages/about';
import ContactUs from '../screens/home/bottoms/pages/contactus';
import Gallery from '../screens/home/bottoms/pages/Gallery';
import Requests from '../screens/home/bottoms/pages/Requests';
import MyRequests from '../screens/home/bottoms/pages/MyRequests';
import Money from '../screens/home/bottoms/pages/Money';
import Pricing from '../screens/home/bottoms/pages/Pricing';
import NewsDetails from '../screens/home/bottoms/pages/NewsDetails';








import Profile from '../screens/home/bottoms/pages/profile';

import Login from '../screens/home/bottoms/auth/Login';
import Register from '../screens/home/bottoms/auth/Register';
import ForgetPassword from '../screens/home/bottoms/auth/ForgetPassword';


// import EmailVerification from '../screens/home/bottoms/auth/EmailVerification';
// import shopsOrReqturentsDetails from '../screens/home/bottoms/pages/shopsOrReqturentsDetails';
import CeleberateDetails from '../screens/home/bottoms/pages/CeleberateDetails';
import CeleberateBooking from '../screens/home/bottoms/pages/CeleberateBooking';
import MakeBooking from '../screens/home/bottoms/pages/MakeBooking';
import Dashboard from '../screens/home/bottoms/pages/Dashboard';
import Search from '../screens/home/bottoms/search';





// import OrderDetails from '../screens/home/bottoms/childs/orderDetails';
// import OrderRate from '../screens/home/bottoms/childs/orderRate';
// // import checkoutReorder from '../screens/home/bottoms/pages/checkoutReorder';
// import Settings from '../screens/home/bottoms/pages/settings';
// import Filters from '../screens/home/bottoms/pages/filter';
// import Location from '../screens/home/bottoms/pages/Location';
// import ResturentsList from '../screens/home/bottoms/pages/ResturentsList';
// import Cart from '../screens/home/bottoms/cart';
// import ProductViewpage from '../screens/home/bottoms/childs/ProductViewpage';
// import AddressCheckout from '../screens/home/bottoms/pages/addressCheckout';
// import GuestInfo from '../screens/home/bottoms/pages/GuestInfo';
// import notifications from '../screens/home/bottoms/notifications';





const AppStackNavigator = createStackNavigator({
    splash: {
        screen: Splash, navigationOptions: {
            header: null,
        }

    },
    home: {
        screen: BottomTabNavigator, navigationOptions: {
            header: null,
        }
    },
    CeleberateDetails: {
        screen: CeleberateDetails,
        navigationOptions: {
            header: null,
        }
    },
    CeleberateBooking: {
        screen: CeleberateBooking,
        navigationOptions: {
            header: null,
        }
    },
    MakeBooking: {
        screen: MakeBooking,
        navigationOptions: {
            header: null,
        }
    },
    search: {
        screen: Search,
        navigationOptions: {
            header: null,
        }
    },
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            header: null,
        }
    },
    Gallery: {
        screen: Gallery,
        navigationOptions: {
            header: null,
        }
    },
    Requests: {
        screen: Requests,
        navigationOptions: {
            header: null,
        }
    },
    Money: {
        screen: Money,
        navigationOptions: {
            header: null,
        }
    },
    MyRequests: {
        screen: MyRequests,
        navigationOptions: {
            header: null,
        }
    },
    Pricing: {
        screen: Pricing,
        navigationOptions: {
            header: null,
        }
    },
    NewsDetails: {
        screen: NewsDetails,
        navigationOptions: {
            header: null,
        }
    },



    // Guest: {
    //     screen: GuestInfo, navigationOptions: {
    //         header: null,
    //     }
    // },
    // shopsOrReqturents: {
    //     screen: shopsOrReqturents,
    //     navigationOptions: {
    //         header: null,
    //     }
    // },
    // shopsOrReqturentsCategory: {
    //     screen: shopsOrReqturentsCategory,
    //     navigationOptions: {
    //         header: null,
    //     }
    // },
    // shopsOrReqturentsDetails: {
    //     screen: shopsOrReqturentsDetails,
    //     navigationOptions: {
    //         header: null,
    //     }
    // },
    // // checkoutReorder: {
    // //     screen: checkoutReorder,
    // //     navigationOptions: {
    // //         header: null,
    // //     }
    // // },
    // ResturentsList: {
    //     screen: ResturentsList,
    //     navigationOptions: {
    //         header: null,
    //     }
    // },
    // Location: {
    //     screen: Location,
    //     navigationOptions: {
    //         header: null,
    //     }
    // },
    // Filters: {
    //     screen: Filters,
    //     navigationOptions: {
    //         header: null,
    //     }
    // },
    // OrderRate: {
    //     screen: OrderRate,
    //     navigationOptions: {
    //         header: null,
    //     }
    // },
    // OrderDetails: {
    //     screen: OrderDetails,
    //     navigationOptions: {
    //         header: null,
    //     }
    // },
    // Orders: {
    //     screen: Orders,
    //     navigationOptions: {
    //         header: null,
    //     }
    // },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null,
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
            header: null,
        }
    },
    // EmailVerification: {
    //     screen: EmailVerification,
    //     navigationOptions: {
    //         header: null,
    //     }
    // },
    ForgetPassword: {
        screen: ForgetPassword,
        navigationOptions: {
            header: null,
        }
    },
    // Settings: {
    //     screen: Settings, navigationOptions: {
    //         header: null,
    //     }
    // },
    Profile: {
        screen: Profile, navigationOptions: {
            header: null,
        }
    },
    // AddressBook: {
    //     screen: AddressBook, navigationOptions: {
    //         header: null,
    //     }
    // },
    // AddressCheckout: {
    //     screen: AddressCheckout, navigationOptions: {
    //         header: null,
    //     }
    // },

    About: {
        screen: About, navigationOptions: {
            header: null,
        }
    },
    ContactUs: {
        screen: ContactUs, navigationOptions: {
            header: null,
        }
    },
    // notifications: {
    //     screen: notifications, navigationOptions: {
    //         header: null,
    //     }
    // },
    // // FarmerDetails: {
    // //     screen: FarmerDetails, navigationOptions: {
    // //         header: null,
    // //     }
    // // },
    // addressBook: {
    //     screen: AddressBook, navigationOptions: {
    //         header: null,
    //     }
    // },
    // addAddress: {
    //     screen: AddAddress, navigationOptions: {
    //         header: null,
    //     }
    // },
    // // CategoriesProductsList: {
    // //     screen: CategoriesProductsList, navigationOptions: {
    // //         header: null,
    // //     }
    // // },
    // Checkout: {
    //     screen: Checkout, navigationOptions: {
    //         header: null,
    //     }
    // },
    // Payment: {
    //     screen: Payment, navigationOptions: {
    //         header: null,
    //     }
    // },
    // Cart: {
    //     screen: Cart, navigationOptions: {
    //         header: null,
    //     }
    // }
});
const App = createAppContainer(AppStackNavigator);

export default App;