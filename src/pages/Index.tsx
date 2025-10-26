import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface CartItem {
  productId: number;
  quantity: number;
}

const products = [
  {
    id: 1,
    name: 'Клубничный торт',
    category: 'Торты',
    price: 2500,
    image: 'https://cdn.poehali.dev/projects/a056d120-8143-4f3a-b98b-347aba4afe8e/files/48d59a66-4ed3-4af8-b90a-57d775e8772d.jpg',
    description: 'Нежный бисквит с клубничным кремом и свежей клубникой',
    weight: '1 кг',
    ingredients: 'Клубника, сливки, бисквит, сахар'
  },
  {
    id: 2,
    name: 'Французские макаруны',
    category: 'Макаруны',
    price: 150,
    image: 'https://cdn.poehali.dev/projects/a056d120-8143-4f3a-b98b-347aba4afe8e/files/9c5aa831-4a90-4ae5-81f9-4836eecff9c2.jpg',
    description: 'Воздушное миндальное печенье с кремовой начинкой',
    weight: '1 шт',
    ingredients: 'Миндальная мука, сливочный крем'
  },
  {
    id: 3,
    name: 'Шоколадные капкейки',
    category: 'Капкейки',
    price: 250,
    image: 'https://cdn.poehali.dev/projects/a056d120-8143-4f3a-b98b-347aba4afe8e/files/21f8d061-ec01-4d6e-adad-01d40588de0e.jpg',
    description: 'С кремовой начинкой и свежими ягодами',
    weight: '1 шт',
    ingredients: 'Шоколад, крем, ягоды, бисквит'
  },
  {
    id: 4,
    name: 'Торт "Наполеон"',
    category: 'Торты',
    price: 2200,
    image: 'https://cdn.poehali.dev/projects/a056d120-8143-4f3a-b98b-347aba4afe8e/files/48d59a66-4ed3-4af8-b90a-57d775e8772d.jpg',
    description: 'Классический рецепт со сливочным кремом',
    weight: '1 кг',
    ingredients: 'Слоеное тесто, заварной крем, ваниль'
  },
  {
    id: 5,
    name: 'Пирожное "Картошка"',
    category: 'Пирожные',
    price: 120,
    image: 'https://cdn.poehali.dev/projects/a056d120-8143-4f3a-b98b-347aba4afe8e/files/21f8d061-ec01-4d6e-adad-01d40588de0e.jpg',
    description: 'Классическое шоколадное пирожное',
    weight: '100 г',
    ingredients: 'Бисквитная крошка, какао, сгущенка'
  },
  {
    id: 6,
    name: 'Эклеры ассорти',
    category: 'Пирожные',
    price: 180,
    image: 'https://cdn.poehali.dev/projects/a056d120-8143-4f3a-b98b-347aba4afe8e/files/9c5aa831-4a90-4ae5-81f9-4836eecff9c2.jpg',
    description: 'Заварные пирожные с разными начинками',
    weight: '1 шт',
    ingredients: 'Заварное тесто, крем, глазурь'
  }
];

const categories = [
  { name: 'Торты', icon: 'Cake', link: '#catalog' },
  { name: 'Капкейки', icon: 'Coffee', link: '#catalog' },
  { name: 'Макаруны', icon: 'Cookie', link: '#catalog' },
  { name: 'Пирожные', icon: 'Dessert', link: '#catalog' },
];

const features = [
  { step: '1', title: 'Выберите', description: 'Десерт из каталога', icon: 'Search' },
  { step: '2', title: 'Закажите', description: 'Онлайн или по телефону', icon: 'ShoppingCart' },
  { step: '3', title: 'Получите', description: 'Свежий десерт вовремя', icon: 'Gift' },
];

const reviews = [
  {
    id: 1,
    name: 'Анна М.',
    text: 'Заказывала торт на день рождения дочки. Все гости в восторге! Очень вкусно и красиво.',
    rating: 5
  },
  {
    id: 2,
    name: 'Дмитрий К.',
    text: 'Макаруны просто невероятные! Свежие, с натуральным вкусом.',
    rating: 5
  },
  {
    id: 3,
    name: 'Елена С.',
    text: 'Заказываем десерты для офиса регулярно. Всегда высокое качество!',
    rating: 5
  }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    date: '',
    time: '',
    comment: ''
  });
  const { toast } = useToast();

  const heroSlides = [
    {
      title: 'Сладкие моменты вашей жизни',
      subtitle: 'Ручная работа из премиальных ингредиентов. Без консервантов.',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1920&h=800&fit=crop&q=80'
    },
    {
      title: 'Французские макаруны',
      subtitle: 'Изысканный вкус парижской кондитерской',
      image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=1920&h=800&fit=crop&q=80'
    },
    {
      title: 'Капкейки на любой вкус',
      subtitle: 'Идеальны для праздников и корпоративов',
      image: 'https://cdn.poehali.dev/projects/a056d120-8143-4f3a-b98b-347aba4afe8e/files/21f8d061-ec01-4d6e-adad-01d40588de0e.jpg'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const addToCart = (productId: number) => {
    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
      setCart(cart.map(item => 
        item.productId === productId 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { productId, quantity: 1 }]);
    }
    toast({
      title: 'Товар добавлен в корзину',
      description: products.find(p => p.id === productId)?.name,
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.productId === productId 
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Заказ оформлен!',
      description: `Спасибо, ${orderForm.name}! Мы свяжемся с вами в ближайшее время.`,
    });
    setIsCheckoutOpen(false);
    setCart([]);
    setOrderForm({
      name: '',
      phone: '',
      email: '',
      address: '',
      date: '',
      time: '',
      comment: ''
    });
  };

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Cake" size={28} className="text-primary md:w-8 md:h-8" />
              <h1 className="text-xl md:text-2xl font-bold text-foreground">Sweet Delight</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#catalog" className="text-foreground hover:text-primary transition-colors font-medium">Каталог</a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">О нас</a>
              <a href="#reviews" className="text-foreground hover:text-primary transition-colors font-medium">Отзывы</a>
              <a href="#contacts" className="text-foreground hover:text-primary transition-colors font-medium">Контакты</a>
            </nav>
            <div className="flex items-center gap-2 md:gap-4">
              <a href="tel:+79991234567" className="hidden lg:flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <Icon name="Phone" size={20} />
                <span className="font-medium">+7 999 123-45-67</span>
              </a>
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="relative">
                    <Icon name="ShoppingCart" size={18} />
                    {getTotalItems() > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {getTotalItems()}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg flex flex-col">
                  <SheetHeader>
                    <SheetTitle className="text-2xl">Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="flex-1 flex flex-col mt-6">
                    {cart.length === 0 ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <Icon name="ShoppingCart" size={64} className="text-muted-foreground mb-4" />
                        <p className="text-lg text-muted-foreground">Корзина пуста</p>
                        <p className="text-sm text-muted-foreground mt-2">Добавьте десерты из каталога</p>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1 overflow-auto space-y-4 pr-2">
                          {cart.map((item) => {
                            const product = products.find(p => p.id === item.productId);
                            if (!product) return null;
                            return (
                              <Card key={item.productId} className="border-border">
                                <CardContent className="p-4">
                                  <div className="flex gap-4">
                                    <img 
                                      src={product.image} 
                                      alt={product.name}
                                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-semibold mb-1 truncate">{product.name}</h4>
                                      <p className="text-sm text-muted-foreground mb-2">{product.weight}</p>
                                      <p className="font-bold text-primary">{product.price} ₽</p>
                                    </div>
                                    <div className="flex flex-col items-end justify-between">
                                      <Button 
                                        variant="ghost" 
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => removeFromCart(item.productId)}
                                      >
                                        <Icon name="Trash2" size={16} />
                                      </Button>
                                      <div className="flex items-center gap-2">
                                        <Button 
                                          variant="outline" 
                                          size="icon"
                                          className="h-7 w-7"
                                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                        >
                                          <Icon name="Minus" size={14} />
                                        </Button>
                                        <span className="w-6 text-center font-medium text-sm">{item.quantity}</span>
                                        <Button 
                                          variant="outline" 
                                          size="icon"
                                          className="h-7 w-7"
                                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                        >
                                          <Icon name="Plus" size={14} />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>
                        <div className="border-t pt-4 mt-4 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-lg">Итого:</span>
                            <span className="font-bold text-2xl text-primary">{getCartTotal()} ₽</span>
                          </div>
                          <Button 
                            onClick={handleCheckout}
                            className="w-full bg-primary hover:bg-primary/90 text-foreground font-semibold"
                            size="lg"
                          >
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-16">
        <section className="relative h-[500px] md:h-[700px] overflow-hidden">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-background" />
              <div className="absolute inset-0 container mx-auto px-4 flex items-center">
                <div className="max-w-3xl text-center md:text-left mx-auto md:mx-0">
                  <h2 className="text-3xl md:text-7xl font-bold mb-3 md:mb-6 text-white drop-shadow-lg">
                    {slide.title}
                  </h2>
                  <p className="text-base md:text-2xl mb-6 md:mb-8 text-white/95 drop-shadow">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start">
                    <Button 
                      size="lg" 
                      className="bg-primary hover:bg-primary/90 text-foreground font-semibold" 
                      onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Смотреть каталог
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="bg-white/90 hover:bg-white border-0 text-foreground font-semibold" 
                      onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      О нас
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Слайд ${index + 1}`}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index ? 'bg-primary w-8' : 'bg-white/60 w-2'
                }`}
              />
            ))}
          </div>
        </section>

        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">Популярные категории</h2>
              <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
                Выберите категорию десертов для особого момента
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {categories.map((category, index) => (
                <a
                  key={category.name}
                  href={category.link}
                  className="group bg-card hover:bg-primary/10 rounded-2xl p-6 md:p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-border"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Icon name={category.icon as any} size={28} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-base md:text-lg">{category.name}</h3>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="catalog" className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">Хиты продаж</h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Самые популярные десерты наших клиентов
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {products.map((product, index) => (
                <Card
                  key={product.id}
                  className="animate-slide-up hover-lift cursor-pointer bg-card border border-border overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-56 md:h-64 bg-muted/20 overflow-hidden group">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {index < 3 && (
                      <Badge className="absolute top-3 right-3 bg-primary text-foreground font-semibold shadow-lg">
                        Хит продаж
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="text-xl md:text-2xl font-bold text-primary">{product.price} ₽</p>
                        <p className="text-xs md:text-sm text-muted-foreground">{product.weight}</p>
                      </div>
                      <Button
                        onClick={() => addToCart(product.id)}
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-foreground font-semibold flex-shrink-0"
                      >
                        <Icon name="ShoppingCart" size={16} className="md:mr-2" />
                        <span className="hidden md:inline">В корзину</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 md:mb-8">О нас</h2>
              <p className="text-center text-muted-foreground mb-8 md:mb-12 text-sm md:text-lg max-w-2xl mx-auto">
                Мы создаём авторские десерты из премиальных ингредиентов с 2015 года.
                Каждый десерт — это ручная работа с любовью к деталям.
              </p>
              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {features.map((feature, index) => (
                  <Card
                    key={feature.step}
                    className="text-center p-6 md:p-8 hover:shadow-lg transition-shadow bg-card border-border"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                      <Icon name={feature.icon as any} size={28} className="text-primary" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-3">{feature.step}</div>
                    <h3 className="font-bold text-lg md:text-xl mb-2">{feature.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground">{feature.description}</p>
                  </Card>
                ))}
              </div>
              <div className="mt-12 md:mt-16 grid md:grid-cols-3 gap-6 md:gap-8 text-center">
                <div className="p-6">
                  <Icon name="Award" size={32} className="mx-auto mb-3 text-primary" />
                  <h4 className="font-bold text-base md:text-lg mb-2">Премиальные ингредиенты</h4>
                  <p className="text-sm text-muted-foreground">Только лучшее сырье от проверенных поставщиков</p>
                </div>
                <div className="p-6">
                  <Icon name="Heart" size={32} className="mx-auto mb-3 text-primary" />
                  <h4 className="font-bold text-base md:text-lg mb-2">Без консервантов</h4>
                  <p className="text-sm text-muted-foreground">100% натуральные продукты и свежесть</p>
                </div>
                <div className="p-6">
                  <Icon name="Users" size={32} className="mx-auto mb-3 text-primary" />
                  <h4 className="font-bold text-base md:text-lg mb-2">Опытные кондитеры</h4>
                  <p className="text-sm text-muted-foreground">Команда мастеров своего дела</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">Отзывы</h2>
            <p className="text-center text-muted-foreground mb-8 md:mb-12 text-sm md:text-base">
              Что говорят наши клиенты
            </p>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {reviews.map((review, index) => (
                <Card
                  key={review.id}
                  className="animate-slide-up bg-card border-border"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={18} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic text-sm md:text-base">"{review.text}"</p>
                    <p className="font-semibold">{review.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contacts" className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">Свяжитесь с нами</h2>
              <p className="text-center text-muted-foreground mb-8 md:mb-12 text-sm md:text-base">
                Остались вопросы? Мы с радостью на них ответим!
              </p>
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                <div>
                  <h3 className="font-bold text-lg md:text-xl mb-6">Контактная информация</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Icon name="MapPin" size={24} className="text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Адрес</p>
                        <p className="text-muted-foreground text-sm md:text-base">г. Москва, ул. Кондитерская, д. 10</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Phone" size={24} className="text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Телефон</p>
                        <a href="tel:+79991234567" className="text-muted-foreground hover:text-primary transition-colors text-sm md:text-base">
                          +7 999 123-45-67
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Mail" size={24} className="text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Email</p>
                        <a href="mailto:info@sweetdelight.ru" className="text-muted-foreground hover:text-primary transition-colors text-sm md:text-base">
                          info@sweetdelight.ru
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Clock" size={24} className="text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Режим работы</p>
                        <p className="text-muted-foreground text-sm md:text-base">Ежедневно с 9:00 до 21:00</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg md:text-xl mb-6">Напишите нам</h3>
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast({ title: 'Сообщение отправлено!', description: 'Мы свяжемся с вами в ближайшее время.' }); }}>
                    <Input placeholder="Ваше имя" required />
                    <Input type="tel" placeholder="Телефон" required />
                    <Textarea placeholder="Ваше сообщение" rows={4} required />
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-foreground font-semibold">
                      Отправить
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-foreground text-background py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Cake" size={28} className="text-primary" />
                <h3 className="text-xl font-bold">Sweet Delight</h3>
              </div>
              <p className="text-sm opacity-80">
                Авторские десерты ручной работы из премиальных ингредиентов
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Навигация</h4>
              <nav className="space-y-2 text-sm">
                <a href="#catalog" className="block opacity-80 hover:opacity-100 transition-opacity">Каталог</a>
                <a href="#about" className="block opacity-80 hover:opacity-100 transition-opacity">О нас</a>
                <a href="#reviews" className="block opacity-80 hover:opacity-100 transition-opacity">Отзывы</a>
                <a href="#contacts" className="block opacity-80 hover:opacity-100 transition-opacity">Контакты</a>
              </nav>
            </div>
            <div>
              <h4 className="font-bold mb-4">Подписка</h4>
              <p className="text-sm opacity-80 mb-4">Узнавайте о новинках и акциях первыми</p>
              <div className="flex gap-2">
                <Input placeholder="Ваш email" className="bg-background text-foreground" />
                <Button className="bg-primary hover:bg-primary/90 text-foreground flex-shrink-0">
                  <Icon name="Send" size={18} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm opacity-60">
            © 2024 Sweet Delight. Все права защищены.
          </div>
        </div>
      </footer>

      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Оформление заказа</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitOrder} className="space-y-6 mt-4">
            <div className="bg-muted/30 rounded-lg p-4 space-y-2">
              <h3 className="font-semibold mb-3">Ваш заказ:</h3>
              {cart.map((item) => {
                const product = products.find(p => p.id === item.productId);
                if (!product) return null;
                return (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span>{product.name} × {item.quantity}</span>
                    <span className="font-medium">{product.price * item.quantity} ₽</span>
                  </div>
                );
              })}
              <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
                <span>Итого:</span>
                <span className="text-primary">{getCartTotal()} ₽</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Имя *</Label>
                  <Input
                    id="name"
                    required
                    placeholder="Ваше имя"
                    value={orderForm.name}
                    onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    required
                    type="tel"
                    placeholder="+7 999 123-45-67"
                    value={orderForm.phone}
                    onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={orderForm.email}
                  onChange={(e) => setOrderForm({...orderForm, email: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="address">Адрес доставки *</Label>
                <Input
                  id="address"
                  required
                  placeholder="г. Москва, ул. Примерная, д. 1, кв. 10"
                  value={orderForm.address}
                  onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Дата доставки *</Label>
                  <Input
                    id="date"
                    required
                    type="date"
                    value={orderForm.date}
                    onChange={(e) => setOrderForm({...orderForm, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Время доставки *</Label>
                  <Input
                    id="time"
                    required
                    type="time"
                    value={orderForm.time}
                    onChange={(e) => setOrderForm({...orderForm, time: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="comment">Комментарий к заказу</Label>
                <Textarea
                  id="comment"
                  placeholder="Особые пожелания, надписи на торте и т.д."
                  rows={3}
                  value={orderForm.comment}
                  onChange={(e) => setOrderForm({...orderForm, comment: e.target.value})}
                />
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 flex items-start gap-3">
              <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm text-muted-foreground">
                <p>После оформления заказа наш менеджер свяжется с вами для подтверждения.</p>
                <p className="mt-1">Доставка осуществляется ежедневно с 9:00 до 21:00.</p>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-foreground font-semibold"
              size="lg"
            >
              Подтвердить заказ
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;