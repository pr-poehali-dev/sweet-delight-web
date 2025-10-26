import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const products = [
  {
    id: 1,
    name: 'Клубничный торт',
    category: 'Торты',
    price: 2500,
    image: 'https://cdn.poehali.dev/projects/a056d120-8143-4f3a-b98b-347aba4afe8e/files/48d59a66-4ed3-4af8-b90a-57d775e8772d.jpg',
    description: 'Нежный бисквит с клубничным кремом',
    weight: '1 кг'
  },
  {
    id: 2,
    name: 'Французские макаруны',
    category: 'Макаруны',
    price: 150,
    image: 'https://cdn.poehali.dev/projects/a056d120-8143-4f3a-b98b-347aba4afe8e/files/9c5aa831-4a90-4ae5-81f9-4836eecff9c2.jpg',
    description: 'Ассорти из 6 вкусов',
    weight: '1 шт'
  },
  {
    id: 3,
    name: 'Шоколадные капкейки',
    category: 'Капкейки',
    price: 250,
    image: 'https://cdn.poehali.dev/projects/a056d120-8143-4f3a-b98b-347aba4afe8e/files/21f8d061-ec01-4d6e-adad-01d40588de0e.jpg',
    description: 'С кремовой начинкой и ягодами',
    weight: '1 шт'
  },
  {
    id: 4,
    name: 'Торт "Наполеон"',
    category: 'Торты',
    price: 2200,
    image: 'https://cdn.poehali.dev/projects/a056d120-8143-4f3a-b98b-347aba4afe8e/files/48d59a66-4ed3-4af8-b90a-57d775e8772d.jpg',
    description: 'Классический рецепт',
    weight: '1 кг'
  }
];

const categories = [
  { name: 'Торты', icon: 'Cake', color: 'bg-pink-100' },
  { name: 'Капкейки', icon: 'IceCream', color: 'bg-yellow-100' },
  { name: 'Макаруны', icon: 'Cookie', color: 'bg-purple-100' },
  { name: 'Пирожные', icon: 'Dessert', color: 'bg-orange-100' }
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
  const [cart, setCart] = useState<number[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
  };

  const heroSlides = [
    {
      title: 'Авторские десерты ручной работы',
      subtitle: 'Создаём сладкие моменты из премиальных ингредиентов',
      image: 'https://cdn.poehali.dev/projects/a056d120-8143-4f3a-b98b-347aba4afe8e/files/48d59a66-4ed3-4af8-b90a-57d775e8772d.jpg'
    },
    {
      title: 'Французские макаруны',
      subtitle: 'Изысканный вкус парижской кондитерской',
      image: 'https://cdn.poehali.dev/projects/a056d120-8143-4f3a-b98b-347aba4afe8e/files/9c5aa831-4a90-4ae5-81f9-4836eecff9c2.jpg'
    },
    {
      title: 'Капкейки на любой вкус',
      subtitle: 'Идеальны для праздников и корпоративов',
      image: 'https://cdn.poehali.dev/projects/a056d120-8143-4f3a-b98b-347aba4afe8e/files/21f8d061-ec01-4d6e-adad-01d40588de0e.jpg'
    }
  ];

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Cake" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Sweet Delight</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#catalog" className="text-foreground hover:text-primary transition-colors">Каталог</a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">О нас</a>
              <a href="#reviews" className="text-foreground hover:text-primary transition-colors">Отзывы</a>
              <a href="#contacts" className="text-foreground hover:text-primary transition-colors">Контакты</a>
            </nav>
            <div className="flex items-center gap-4">
              <a href="tel:+79991234567" className="hidden md:flex items-center gap-2 text-foreground">
                <Icon name="Phone" size={20} />
                <span className="font-medium">+7 999 123-45-67</span>
              </a>
              <Button variant="outline" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20">
        <section className="relative h-[600px] overflow-hidden">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/50 z-10" />
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl animate-fade-in">
                    <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
                      {slide.title}
                    </h2>
                    <p className="text-xl text-muted-foreground mb-8">
                      {slide.subtitle}
                    </p>
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-foreground font-medium">
                      Выбрать десерт
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-primary w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in">
              Популярные категории
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <Card
                  key={category.name}
                  className="hover-lift cursor-pointer animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8 text-center">
                    <div className={`${category.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon name={category.icon} size={32} className="text-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="catalog" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Хиты продаж</h2>
            <p className="text-center text-muted-foreground mb-12">Наши самые популярные десерты</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <Card
                  key={product.id}
                  className="hover-lift overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                    <h3 className="font-bold text-xl mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted-foreground">{product.weight}</span>
                      <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                    </div>
                    <Button
                      onClick={() => addToCart(product.id)}
                      className="w-full bg-primary hover:bg-primary/90 text-foreground"
                    >
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      В корзину
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">Как мы работаем</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-foreground">1</span>
                  </div>
                  <h3 className="font-bold text-xl mb-2">Выберите десерт</h3>
                  <p className="text-muted-foreground">Из нашего каталога или создайте индивидуальный заказ</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-foreground">2</span>
                  </div>
                  <h3 className="font-bold text-xl mb-2">Оформите заказ</h3>
                  <p className="text-muted-foreground">Через сайт, по телефону или в соцсетях</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-foreground">3</span>
                  </div>
                  <h3 className="font-bold text-xl mb-2">Получите свежий десерт</h3>
                  <p className="text-muted-foreground">Доставка в день заказа или самовывоз</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Отзывы наших клиентов</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {reviews.map((review, index) => (
                <Card
                  key={review.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={20} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{review.text}"</p>
                    <p className="font-semibold">{review.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contacts" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-4">Свяжитесь с нами</h2>
              <p className="text-center text-muted-foreground mb-12">
                Остались вопросы? Мы с радостью на них ответим!
              </p>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="font-bold text-xl mb-6">Контактная информация</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Icon name="MapPin" size={24} className="text-primary mt-1" />
                      <div>
                        <p className="font-medium">Адрес</p>
                        <p className="text-muted-foreground">г. Москва, ул. Кондитерская, д. 10</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Phone" size={24} className="text-primary mt-1" />
                      <div>
                        <p className="font-medium">Телефон</p>
                        <p className="text-muted-foreground">+7 999 123-45-67</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Mail" size={24} className="text-primary mt-1" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-muted-foreground">info@sweetdelight.ru</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Clock" size={24} className="text-primary mt-1" />
                      <div>
                        <p className="font-medium">Режим работы</p>
                        <p className="text-muted-foreground">Ежедневно с 9:00 до 21:00</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Icon name="Instagram" size={20} />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Icon name="Facebook" size={20} />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Icon name="MessageCircle" size={20} />
                    </Button>
                  </div>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-4">Форма обратной связи</h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Имя</label>
                        <Input placeholder="Ваше имя" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Телефон</label>
                        <Input placeholder="+7 999 123-45-67" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Сообщение</label>
                        <Textarea placeholder="Ваш вопрос или комментарий" rows={4} />
                      </div>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-foreground">
                        Отправить
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
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
              <h4 className="font-bold mb-4">Меню</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#catalog" className="hover:text-primary transition-colors">Каталог</a></li>
                <li><a href="#about" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#reviews" className="hover:text-primary transition-colors">Отзывы</a></li>
                <li><a href="#contacts" className="hover:text-primary transition-colors">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Доставка и оплата</li>
                <li>Программа лояльности</li>
                <li>Акции</li>
                <li>Вакансии</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Подписка</h4>
              <p className="text-sm opacity-80 mb-4">Узнавайте о новинках и акциях первыми</p>
              <div className="flex gap-2">
                <Input placeholder="Ваш email" className="bg-background text-foreground" />
                <Button className="bg-primary hover:bg-primary/90 text-foreground">
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
    </div>
  );
};

export default Index;