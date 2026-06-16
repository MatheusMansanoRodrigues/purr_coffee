(function (global) {
  const STORAGE_KEY = "purr_settings";

  const DEFAULTS = {
    language: "en",
    currency: "USD",
    defaultDelivery: "delivery",
    defaultSize: "small",
    profile: {
      name: "Coffee Lover",
      email: "coffee@purr.com",
      phone: "",
    },
    notifications: {
      orderUpdates: true,
      promotions: true,
      newItems: false,
      newsletter: false,
      receipts: true,
    },
    privacy: {
      analytics: true,
      recommendations: true,
      addressHistory: false,
    },
  };

  const CURRENCIES = {
    USD: { code: "USD", locale: "en-US", rate: 1 },
    BRL: { code: "BRL", locale: "pt-BR", rate: 5.0 },
    EUR: { code: "EUR", locale: "de-DE", rate: 0.92 },
  };

  const DELIVERY_KEYS = ["delivery", "dinein", "takeaway"];
  const SIZE_KEYS = ["small", "large"];

  const LEGACY_DELIVERY = {
    Delivery: "delivery",
    "Dine in": "dinein",
    "Take away": "takeaway",
  };

  const LEGACY_SIZE = {
    Small: "small",
    Large: "large",
  };

  const LOCALE_MAP = { en: "en", pt: "pt-BR", es: "es" };

  const STRINGS = {
    en: {
      "nav.home": "Home page",
      "nav.menu": "Menu",
      "nav.orders": "My orders",
      "nav.history": "History",
      "nav.partners": "Partners",
      "nav.settings": "Settings",
      "nav.donate": "Buy Me a Coffee",
      "nav.logout": "Log out",
      "nav.mobileMenu": "Menu",
      "home.title": "Good morning,<br />coffee lover",
      "home.sub":
        "What are you having today? Explore our fresh menu and place your order.",
      "home.browse": "Browse menu",
      "home.quickAccess": "Quick access",
      "home.menu": "Menu",
      "home.cart": "My cart",
      "home.history": "History",
      "home.partners": "Partners",
      "home.highlights": "Today's highlights",
      "home.orderNow": "Order now",
      "home.priceSmallLarge": "Small or Large",
      "home.priceClassic": "Classic",
      "home.promo": "Use code <strong>PURR10</strong> and get 10% off",
      "home.promoSub": "Valid on any order today only",
      "home.copyCode": "Copy code",
      "menu.search": "Search",
      "menu.filter": "Filter",
      "menu.title": "Coffee menu",
      "cat.coffee": "Coffee",
      "cat.noncoffee": "Non Coffee",
      "cat.food": "Food",
      "cat.snack": "Snack",
      "cat.dessert": "Dessert",
      "menu.cartTitle": "Cart summary",
      "menu.price": "Price",
      "menu.discount": "Discount applied",
      "menu.total": "Grand total",
      "menu.placeOrder": "Place an order",
      "menu.emptyCart": "Your cart is empty.",
      "menu.size": "Size",
      "menu.addToCart": "Add to Cart",
      "menu.noProducts": "No products found.",
      "delivery.delivery": "Delivery",
      "delivery.dinein": "Dine in",
      "delivery.takeaway": "Take away",
      "size.small": "Small",
      "size.large": "Large",
      "orders.title": "My Orders",
      "orders.sub": "Track your cart, active orders and full history",
      "orders.back": "Back to menu",
      "orders.tab.cart": "Cart",
      "orders.tab.active": "Active orders",
      "orders.tab.history": "History",
      "orders.tab.stats": "Stats",
      "orders.currentCart": "Current cart",
      "orders.clearCart": "Clear cart",
      "orders.subtotal": "Subtotal",
      "orders.deliveryFee": "Delivery fee",
      "orders.grandTotal": "Grand total",
      "orders.checkout": "Go to checkout →",
      "orders.activeTitle": "Active orders",
      "orders.activeHint": "Orders placed and being prepared",
      "orders.historyTitle": "Order history",
      "orders.clearHistory": "Clear history",
      "orders.statsTitle": "My stats",
      "orders.statsHint": "Based on your order history",
      "orders.emptyCart": "Your cart is empty",
      "orders.emptyCartSub": "Add items from the menu to get started.",
      "orders.noActive": "No active orders",
      "orders.noActiveSub": "Place an order from the menu.",
      "orders.noHistory": "No order history",
      "orders.noHistorySub": "Your completed orders will appear here.",
      "orders.noData": "No data yet",
      "orders.noDataSub": "Place some orders to see your stats.",
      "orders.each": "each",
      "orders.delivered": "Delivered",
      "orders.step.received": "Order received",
      "orders.step.preparing": "Preparing",
      "orders.step.ready": "Ready",
      "orders.step.delivered": "Delivered",
      "orders.stat.totalOrders": "Total orders",
      "orders.stat.items": "Items ordered",
      "orders.stat.spent": "Total spent",
      "orders.stat.avg": "Average order",
      "orders.stat.favorite": "Favourite item",
      "orders.stat.delivery": "Preferred delivery",
      "history.title": "History",
      "history.sub": "All your past orders in one place",
      "history.clearAll": "Clear history",
      "history.filter.all": "All",
      "history.stat.orders": "Total orders",
      "history.stat.items": "Items ordered",
      "history.stat.spent": "Total spent",
      "history.noOrders": "No orders found",
      "history.tryFilter": "Try a different filter.",
      "history.firstOrder": "Place your first order from the menu.",
      "history.delivered": "Delivered",
      "history.reorder": "Reorder",
      "partners.title": "Partners",
      "partners.sub": "Brands and suppliers who make Purr'Coffee possible",
      "partners.learnMore": "Learn more",
      "partners.donate": "Donate now",
      "partners.become": "Become a partner",
      "partners.becomeSub":
        "Want to supply, collaborate or support Purr'Coffee? Let's talk.",
      "partners.contact": "Get in touch",
      "settings.title": "Settings",
      "settings.sub": "Manage your account and preferences",
      "settings.profile": "Profile",
      "settings.notifications": "Notifications",
      "settings.preferences": "Preferences",
      "settings.privacy": "Privacy",
      "settings.account": "Account",
      "settings.changePhoto": "Change photo",
      "settings.personalInfo": "Personal info",
      "settings.fullName": "Full name",
      "settings.email": "E-mail",
      "settings.phone": "Phone",
      "settings.save": "Save changes",
      "settings.pushNotif": "Push notifications",
      "settings.orderUpdates": "Order updates",
      "settings.orderUpdatesDesc":
        "Get notified when your order status changes",
      "settings.promotions": "Promotions",
      "settings.promotionsDesc":
        "Receive discount codes and special offers",
      "settings.newItems": "New items",
      "settings.newItemsDesc": "Be the first to know about new menu additions",
      "settings.emailSection": "E-mail",
      "settings.newsletter": "Weekly newsletter",
      "settings.newsletterDesc": "Tips, stories and coffee culture",
      "settings.receipts": "Order receipts",
      "settings.receiptsDesc": "Receive a receipt after every order",
      "settings.orderDefaults": "Order defaults",
      "settings.defaultDelivery": "Default delivery type",
      "settings.defaultDeliveryDesc":
        "Applied automatically when you open the cart",
      "settings.defaultSize": "Default cup size",
      "settings.display": "Display",
      "settings.language": "Language",
      "settings.currency": "Currency",
      "settings.dataPrivacy": "Data & privacy",
      "settings.analytics": "Share usage analytics",
      "settings.analyticsDesc":
        "Help us improve the app with anonymous data",
      "settings.recommendations": "Personalised recommendations",
      "settings.recommendationsDesc":
        "Show items based on your order history",
      "settings.addressHistory": "Save address history",
      "settings.addressHistoryDesc":
        "Remember delivery addresses for faster checkout",
      "settings.security": "Security",
      "settings.changePassword": "Change password",
      "settings.changePasswordDesc": "Update your login password",
      "settings.update": "Update",
      "settings.twoFactor": "Two-factor authentication",
      "settings.twoFactorDesc": "Add an extra layer of security",
      "settings.dangerZone": "Danger zone",
      "settings.clearData": "Clear local data",
      "settings.clearDataDesc":
        "Remove cart and order history from this device",
      "settings.clearDataBtn": "Clear data",
      "settings.deleteAccount": "Delete account",
      "settings.deleteAccountDesc":
        "Permanently remove your account and all data",
      "settings.deleteAccountBtn": "Delete account",
      "toast.profileSaved": "Profile saved!",
      "toast.notificationsSaved": "Notifications saved!",
      "toast.preferencesSaved": "Preferences saved!",
      "toast.languageSaved": "Language updated!",
      "toast.currencySaved": "Currency updated!",
      "toast.privacySaved": "Privacy settings saved!",
      "toast.photoSoon": "Photo upload coming soon!",
      "toast.passwordSoon": "Change password coming soon!",
      "toast.deleteSoon": "Account deletion coming soon!",
      "toast.dataCleared": "Local data cleared.",
      "toast.codeCopied": "Code PURR10 copied!",
      "toast.addedToCart": "{name} added to cart",
      "toast.cartEmpty": "Your cart is empty!",
      "toast.orderPlaced": "Order placed successfully!",
      "toast.filterSoon": "Filter coming soon!",
      "toast.seeYouSoon": "See you soon!",
      "toast.itemRemoved": "Item removed from cart.",
      "toast.cartCleared": "Cart cleared.",
      "toast.historyCleared": "History cleared.",
      "toast.reorder": "Items added to cart!",
      "confirm.clearData": "Clear all local cart and order data?",
      "confirm.clearCart": "Clear the entire cart?",
      "confirm.clearHistory": "Clear all order history? This cannot be undone.",
      "confirm.clearHistorySimple": "Clear all history?",
    },
    pt: {
      "nav.home": "Página inicial",
      "nav.menu": "Cardápio",
      "nav.orders": "Meus pedidos",
      "nav.history": "Histórico",
      "nav.partners": "Parceiros",
      "nav.settings": "Configurações",
      "nav.donate": "Me pague um café",
      "nav.logout": "Sair",
      "nav.mobileMenu": "Menu",
      "home.title": "Bom dia,<br />amante de café",
      "home.sub":
        "O que você vai pedir hoje? Explore nosso cardápio e faça seu pedido.",
      "home.browse": "Ver cardápio",
      "home.quickAccess": "Acesso rápido",
      "home.menu": "Cardápio",
      "home.cart": "Meu carrinho",
      "home.history": "Histórico",
      "home.partners": "Parceiros",
      "home.highlights": "Destaques de hoje",
      "home.orderNow": "Pedir agora",
      "home.priceSmallLarge": "Pequeno ou Grande",
      "home.priceClassic": "Clássico",
      "home.promo": "Use o código <strong>PURR10</strong> e ganhe 10% off",
      "home.promoSub": "Válido para qualquer pedido feito hoje",
      "home.copyCode": "Copiar código",
      "menu.search": "Buscar",
      "menu.filter": "Filtrar",
      "menu.title": "Cardápio de cafés",
      "cat.coffee": "Cafés",
      "cat.noncoffee": "Sem café",
      "cat.food": "Comidas",
      "cat.snack": "Lanches",
      "cat.dessert": "Sobremesas",
      "menu.cartTitle": "Resumo do carrinho",
      "menu.price": "Preço",
      "menu.discount": "Desconto aplicado",
      "menu.total": "Total geral",
      "menu.placeOrder": "Fazer pedido",
      "menu.emptyCart": "Seu carrinho está vazio.",
      "menu.size": "Tamanho",
      "menu.addToCart": "Adicionar",
      "menu.noProducts": "Nenhum produto encontrado.",
      "delivery.delivery": "Entrega",
      "delivery.dinein": "No local",
      "delivery.takeaway": "Para viagem",
      "size.small": "Pequeno",
      "size.large": "Grande",
      "orders.title": "Meus pedidos",
      "orders.sub":
        "Acompanhe seu carrinho, pedidos ativos e histórico completo",
      "orders.back": "Voltar ao cardápio",
      "orders.tab.cart": "Carrinho",
      "orders.tab.active": "Pedidos ativos",
      "orders.tab.history": "Histórico",
      "orders.tab.stats": "Estatísticas",
      "orders.currentCart": "Carrinho atual",
      "orders.clearCart": "Limpar carrinho",
      "orders.subtotal": "Subtotal",
      "orders.deliveryFee": "Taxa de entrega",
      "orders.grandTotal": "Total geral",
      "orders.checkout": "Ir para checkout →",
      "orders.activeTitle": "Pedidos ativos",
      "orders.activeHint": "Pedidos feitos e em preparo",
      "orders.historyTitle": "Histórico de pedidos",
      "orders.clearHistory": "Limpar histórico",
      "orders.statsTitle": "Minhas estatísticas",
      "orders.statsHint": "Com base no seu histórico de pedidos",
      "orders.emptyCart": "Seu carrinho está vazio",
      "orders.emptyCartSub": "Adicione itens do cardápio para começar.",
      "orders.noActive": "Nenhum pedido ativo",
      "orders.noActiveSub": "Faça um pedido pelo cardápio.",
      "orders.noHistory": "Sem histórico de pedidos",
      "orders.noHistorySub": "Seus pedidos concluídos aparecerão aqui.",
      "orders.noData": "Sem dados ainda",
      "orders.noDataSub": "Faça alguns pedidos para ver suas estatísticas.",
      "orders.each": "cada",
      "orders.delivered": "Entregue",
      "orders.step.received": "Pedido recebido",
      "orders.step.preparing": "Preparando",
      "orders.step.ready": "Pronto",
      "orders.step.delivered": "Entregue",
      "orders.stat.totalOrders": "Total de pedidos",
      "orders.stat.items": "Itens pedidos",
      "orders.stat.spent": "Total gasto",
      "orders.stat.avg": "Pedido médio",
      "orders.stat.favorite": "Item favorito",
      "orders.stat.delivery": "Entrega preferida",
      "history.title": "Histórico",
      "history.sub": "Todos os seus pedidos anteriores em um só lugar",
      "history.clearAll": "Limpar histórico",
      "history.filter.all": "Todos",
      "history.stat.orders": "Total de pedidos",
      "history.stat.items": "Itens pedidos",
      "history.stat.spent": "Total gasto",
      "history.noOrders": "Nenhum pedido encontrado",
      "history.tryFilter": "Tente outro filtro.",
      "history.firstOrder": "Faça seu primeiro pedido pelo cardápio.",
      "history.delivered": "Entregue",
      "history.reorder": "Pedir de novo",
      "partners.title": "Parceiros",
      "partners.sub":
        "Marcas e fornecedores que tornam o Purr'Coffee possível",
      "partners.learnMore": "Saiba mais",
      "partners.donate": "Doar agora",
      "partners.become": "Seja um parceiro",
      "partners.becomeSub":
        "Quer fornecer, colaborar ou apoiar o Purr'Coffee? Vamos conversar.",
      "partners.contact": "Entrar em contato",
      "settings.title": "Configurações",
      "settings.sub": "Gerencie sua conta e preferências",
      "settings.profile": "Perfil",
      "settings.notifications": "Notificações",
      "settings.preferences": "Preferências",
      "settings.privacy": "Privacidade",
      "settings.account": "Conta",
      "settings.changePhoto": "Alterar foto",
      "settings.personalInfo": "Informações pessoais",
      "settings.fullName": "Nome completo",
      "settings.email": "E-mail",
      "settings.phone": "Telefone",
      "settings.save": "Salvar alterações",
      "settings.pushNotif": "Notificações push",
      "settings.orderUpdates": "Atualizações de pedido",
      "settings.orderUpdatesDesc":
        "Seja avisado quando o status do pedido mudar",
      "settings.promotions": "Promoções",
      "settings.promotionsDesc":
        "Receba cupons de desconto e ofertas especiais",
      "settings.newItems": "Novidades",
      "settings.newItemsDesc":
        "Seja o primeiro a saber sobre novos itens do cardápio",
      "settings.emailSection": "E-mail",
      "settings.newsletter": "Newsletter semanal",
      "settings.newsletterDesc": "Dicas, histórias e cultura do café",
      "settings.receipts": "Recibos de pedido",
      "settings.receiptsDesc": "Receba um recibo após cada pedido",
      "settings.orderDefaults": "Padrões de pedido",
      "settings.defaultDelivery": "Tipo de entrega padrão",
      "settings.defaultDeliveryDesc":
        "Aplicado automaticamente ao abrir o carrinho",
      "settings.defaultSize": "Tamanho padrão do copo",
      "settings.display": "Exibição",
      "settings.language": "Idioma",
      "settings.currency": "Moeda",
      "settings.dataPrivacy": "Dados e privacidade",
      "settings.analytics": "Compartilhar analytics de uso",
      "settings.analyticsDesc":
        "Nos ajude a melhorar o app com dados anônimos",
      "settings.recommendations": "Recomendações personalizadas",
      "settings.recommendationsDesc":
        "Mostrar itens com base no seu histórico",
      "settings.addressHistory": "Salvar histórico de endereços",
      "settings.addressHistoryDesc":
        "Lembrar endereços de entrega para checkout mais rápido",
      "settings.security": "Segurança",
      "settings.changePassword": "Alterar senha",
      "settings.changePasswordDesc": "Atualize sua senha de login",
      "settings.update": "Atualizar",
      "settings.twoFactor": "Autenticação em dois fatores",
      "settings.twoFactorDesc": "Adicione uma camada extra de segurança",
      "settings.dangerZone": "Zona de perigo",
      "settings.clearData": "Limpar dados locais",
      "settings.clearDataDesc":
        "Remover carrinho e histórico de pedidos deste dispositivo",
      "settings.clearDataBtn": "Limpar dados",
      "settings.deleteAccount": "Excluir conta",
      "settings.deleteAccountDesc":
        "Remover permanentemente sua conta e todos os dados",
      "settings.deleteAccountBtn": "Excluir conta",
      "toast.profileSaved": "Perfil salvo!",
      "toast.notificationsSaved": "Notificações salvas!",
      "toast.preferencesSaved": "Preferências salvas!",
      "toast.languageSaved": "Idioma atualizado!",
      "toast.currencySaved": "Moeda atualizada!",
      "toast.privacySaved": "Configurações de privacidade salvas!",
      "toast.photoSoon": "Upload de foto em breve!",
      "toast.passwordSoon": "Alteração de senha em breve!",
      "toast.deleteSoon": "Exclusão de conta em breve!",
      "toast.dataCleared": "Dados locais limpos.",
      "toast.codeCopied": "Código PURR10 copiado!",
      "toast.addedToCart": "{name} adicionado ao carrinho",
      "toast.cartEmpty": "Seu carrinho está vazio!",
      "toast.orderPlaced": "Pedido realizado com sucesso!",
      "toast.filterSoon": "Filtro em breve!",
      "toast.seeYouSoon": "Até logo!",
      "toast.itemRemoved": "Item removido do carrinho.",
      "toast.cartCleared": "Carrinho limpo.",
      "toast.historyCleared": "Histórico limpo.",
      "toast.reorder": "Itens adicionados ao carrinho!",
      "confirm.clearData":
        "Limpar todos os dados locais de carrinho e pedidos?",
      "confirm.clearCart": "Limpar todo o carrinho?",
      "confirm.clearHistory":
        "Limpar todo o histórico de pedidos? Isso não pode ser desfeito.",
      "confirm.clearHistorySimple": "Limpar todo o histórico?",
    },
    es: {
      "nav.home": "Inicio",
      "nav.menu": "Menú",
      "nav.orders": "Mis pedidos",
      "nav.history": "Historial",
      "nav.partners": "Socios",
      "nav.settings": "Ajustes",
      "nav.donate": "Invítame un café",
      "nav.logout": "Cerrar sesión",
      "nav.mobileMenu": "Menú",
      "home.title": "Buenos días,<br />amante del café",
      "home.sub":
        "¿Qué vas a pedir hoy? Explora nuestro menú y haz tu pedido.",
      "home.browse": "Ver menú",
      "home.quickAccess": "Acceso rápido",
      "home.menu": "Menú",
      "home.cart": "Mi carrito",
      "home.history": "Historial",
      "home.partners": "Socios",
      "home.highlights": "Destacados de hoy",
      "home.orderNow": "Pedir ahora",
      "home.priceSmallLarge": "Pequeño o Grande",
      "home.priceClassic": "Clásico",
      "home.promo": "Usa el código <strong>PURR10</strong> y obtén 10% off",
      "home.promoSub": "Válido en cualquier pedido de hoy",
      "home.copyCode": "Copiar código",
      "menu.search": "Buscar",
      "menu.filter": "Filtrar",
      "menu.title": "Menú de cafés",
      "cat.coffee": "Cafés",
      "cat.noncoffee": "Sin café",
      "cat.food": "Comidas",
      "cat.snack": "Snacks",
      "cat.dessert": "Postres",
      "menu.cartTitle": "Resumen del carrito",
      "menu.price": "Precio",
      "menu.discount": "Descuento aplicado",
      "menu.total": "Total general",
      "menu.placeOrder": "Hacer pedido",
      "menu.emptyCart": "Tu carrito está vacío.",
      "menu.size": "Tamaño",
      "menu.addToCart": "Añadir",
      "menu.noProducts": "No se encontraron productos.",
      "delivery.delivery": "Entrega",
      "delivery.dinein": "En el local",
      "delivery.takeaway": "Para llevar",
      "size.small": "Pequeño",
      "size.large": "Grande",
      "orders.title": "Mis pedidos",
      "orders.sub":
        "Sigue tu carrito, pedidos activos e historial completo",
      "orders.back": "Volver al menú",
      "orders.tab.cart": "Carrito",
      "orders.tab.active": "Pedidos activos",
      "orders.tab.history": "Historial",
      "orders.tab.stats": "Estadísticas",
      "orders.currentCart": "Carrito actual",
      "orders.clearCart": "Vaciar carrito",
      "orders.subtotal": "Subtotal",
      "orders.deliveryFee": "Tarifa de entrega",
      "orders.grandTotal": "Total general",
      "orders.checkout": "Ir al checkout →",
      "orders.activeTitle": "Pedidos activos",
      "orders.activeHint": "Pedidos realizados y en preparación",
      "orders.historyTitle": "Historial de pedidos",
      "orders.clearHistory": "Borrar historial",
      "orders.statsTitle": "Mis estadísticas",
      "orders.statsHint": "Basado en tu historial de pedidos",
      "orders.emptyCart": "Tu carrito está vacío",
      "orders.emptyCartSub": "Añade artículos del menú para empezar.",
      "orders.noActive": "Sin pedidos activos",
      "orders.noActiveSub": "Haz un pedido desde el menú.",
      "orders.noHistory": "Sin historial de pedidos",
      "orders.noHistorySub": "Tus pedidos completados aparecerán aquí.",
      "orders.noData": "Sin datos aún",
      "orders.noDataSub": "Haz algunos pedidos para ver tus estadísticas.",
      "orders.each": "c/u",
      "orders.delivered": "Entregado",
      "orders.step.received": "Pedido recibido",
      "orders.step.preparing": "Preparando",
      "orders.step.ready": "Listo",
      "orders.step.delivered": "Entregado",
      "orders.stat.totalOrders": "Total de pedidos",
      "orders.stat.items": "Artículos pedidos",
      "orders.stat.spent": "Total gastado",
      "orders.stat.avg": "Pedido promedio",
      "orders.stat.favorite": "Artículo favorito",
      "orders.stat.delivery": "Entrega preferida",
      "history.title": "Historial",
      "history.sub": "Todos tus pedidos anteriores en un solo lugar",
      "history.clearAll": "Borrar historial",
      "history.filter.all": "Todos",
      "history.stat.orders": "Total de pedidos",
      "history.stat.items": "Artículos pedidos",
      "history.stat.spent": "Total gastado",
      "history.noOrders": "No se encontraron pedidos",
      "history.tryFilter": "Prueba otro filtro.",
      "history.firstOrder": "Haz tu primer pedido desde el menú.",
      "history.delivered": "Entregado",
      "history.reorder": "Repetir pedido",
      "partners.title": "Socios",
      "partners.sub": "Marcas y proveedores que hacen posible Purr'Coffee",
      "partners.learnMore": "Saber más",
      "partners.donate": "Donar ahora",
      "partners.become": "Conviértete en socio",
      "partners.becomeSub":
        "¿Quieres suministrar, colaborar o apoyar Purr'Coffee? Hablemos.",
      "partners.contact": "Contactar",
      "settings.title": "Ajustes",
      "settings.sub": "Administra tu cuenta y preferencias",
      "settings.profile": "Perfil",
      "settings.notifications": "Notificaciones",
      "settings.preferences": "Preferencias",
      "settings.privacy": "Privacidad",
      "settings.account": "Cuenta",
      "settings.changePhoto": "Cambiar foto",
      "settings.personalInfo": "Información personal",
      "settings.fullName": "Nombre completo",
      "settings.email": "Correo",
      "settings.phone": "Teléfono",
      "settings.save": "Guardar cambios",
      "settings.pushNotif": "Notificaciones push",
      "settings.orderUpdates": "Actualizaciones de pedido",
      "settings.orderUpdatesDesc":
        "Recibe avisos cuando cambie el estado del pedido",
      "settings.promotions": "Promociones",
      "settings.promotionsDesc":
        "Recibe códigos de descuento y ofertas especiales",
      "settings.newItems": "Novedades",
      "settings.newItemsDesc":
        "Sé el primero en conocer nuevos artículos del menú",
      "settings.emailSection": "Correo",
      "settings.newsletter": "Boletín semanal",
      "settings.newsletterDesc": "Consejos, historias y cultura del café",
      "settings.receipts": "Recibos de pedido",
      "settings.receiptsDesc": "Recibe un recibo después de cada pedido",
      "settings.orderDefaults": "Valores predeterminados",
      "settings.defaultDelivery": "Tipo de entrega predeterminado",
      "settings.defaultDeliveryDesc":
        "Se aplica automáticamente al abrir el carrito",
      "settings.defaultSize": "Tamaño de taza predeterminado",
      "settings.display": "Pantalla",
      "settings.language": "Idioma",
      "settings.currency": "Moneda",
      "settings.dataPrivacy": "Datos y privacidad",
      "settings.analytics": "Compartir analytics de uso",
      "settings.analyticsDesc":
        "Ayúdanos a mejorar la app con datos anónimos",
      "settings.recommendations": "Recomendaciones personalizadas",
      "settings.recommendationsDesc":
        "Mostrar artículos según tu historial",
      "settings.addressHistory": "Guardar historial de direcciones",
      "settings.addressHistoryDesc":
        "Recordar direcciones de entrega para un checkout más rápido",
      "settings.security": "Seguridad",
      "settings.changePassword": "Cambiar contraseña",
      "settings.changePasswordDesc": "Actualiza tu contraseña de acceso",
      "settings.update": "Actualizar",
      "settings.twoFactor": "Autenticación de dos factores",
      "settings.twoFactorDesc": "Añade una capa extra de seguridad",
      "settings.dangerZone": "Zona de peligro",
      "settings.clearData": "Borrar datos locales",
      "settings.clearDataDesc":
        "Eliminar carrito e historial de pedidos de este dispositivo",
      "settings.clearDataBtn": "Borrar datos",
      "settings.deleteAccount": "Eliminar cuenta",
      "settings.deleteAccountDesc":
        "Eliminar permanentemente tu cuenta y todos los datos",
      "settings.deleteAccountBtn": "Eliminar cuenta",
      "toast.profileSaved": "¡Perfil guardado!",
      "toast.notificationsSaved": "¡Notificaciones guardadas!",
      "toast.preferencesSaved": "¡Preferencias guardadas!",
      "toast.languageSaved": "¡Idioma actualizado!",
      "toast.currencySaved": "¡Moneda actualizada!",
      "toast.privacySaved": "¡Ajustes de privacidad guardados!",
      "toast.photoSoon": "¡Subida de foto próximamente!",
      "toast.passwordSoon": "¡Cambio de contraseña próximamente!",
      "toast.deleteSoon": "¡Eliminación de cuenta próximamente!",
      "toast.dataCleared": "Datos locales borrados.",
      "toast.codeCopied": "¡Código PURR10 copiado!",
      "toast.addedToCart": "{name} añadido al carrito",
      "toast.cartEmpty": "¡Tu carrito está vacío!",
      "toast.orderPlaced": "¡Pedido realizado con éxito!",
      "toast.filterSoon": "¡Filtro próximamente!",
      "toast.seeYouSoon": "¡Hasta pronto!",
      "toast.itemRemoved": "Artículo eliminado del carrito.",
      "toast.cartCleared": "Carrito vaciado.",
      "toast.historyCleared": "Historial borrado.",
      "toast.reorder": "¡Artículos añadidos al carrito!",
      "confirm.clearData":
        "¿Borrar todos los datos locales de carrito y pedidos?",
      "confirm.clearCart": "¿Vaciar todo el carrito?",
      "confirm.clearHistory":
        "¿Borrar todo el historial de pedidos? Esto no se puede deshacer.",
      "confirm.clearHistorySimple": "¿Borrar todo el historial?",
    },
  };

  function deepMerge(base, patch) {
    const out = { ...base };
    Object.keys(patch || {}).forEach((key) => {
      if (
        patch[key] &&
        typeof patch[key] === "object" &&
        !Array.isArray(patch[key])
      ) {
        out[key] = deepMerge(base[key] || {}, patch[key]);
      } else if (patch[key] !== undefined) {
        out[key] = patch[key];
      }
    });
    return out;
  }

  function getSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return structuredClone(DEFAULTS);
      return deepMerge(DEFAULTS, JSON.parse(raw));
    } catch {
      return structuredClone(DEFAULTS);
    }
  }

  function saveSettings(patch) {
    const next = deepMerge(getSettings(), patch);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    global.dispatchEvent(
      new CustomEvent("purrSettingsChanged", { detail: next }),
    );
    return next;
  }

  function lang() {
    return getSettings().language || "en";
  }

  function t(key, vars) {
    const table = STRINGS[lang()] || STRINGS.en;
    let text = table[key] ?? STRINGS.en[key] ?? key;
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, v);
      });
    }
    return text;
  }

  function normalizeDelivery(value) {
    if (!value) return "delivery";
    if (DELIVERY_KEYS.includes(value)) return value;
    return LEGACY_DELIVERY[value] || value;
  }

  function normalizeSize(value) {
    if (!value) return "small";
    if (SIZE_KEYS.includes(value)) return value;
    return LEGACY_SIZE[value] || value;
  }

  function deliveryLabel(value) {
    const key = normalizeDelivery(value);
    return t(`delivery.${key}`);
  }

  function sizeLabel(value) {
    const key = normalizeSize(value);
    return t(`size.${key}`);
  }

  function convertPrice(usdValue) {
    const cfg = CURRENCIES[getSettings().currency] || CURRENCIES.USD;
    return Number(usdValue) * cfg.rate;
  }

  function fmt(usdValue) {
    const cfg = CURRENCIES[getSettings().currency] || CURRENCIES.USD;
    const converted = convertPrice(usdValue);
    return converted.toLocaleString(cfg.locale, {
      style: "currency",
      currency: cfg.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function fmtDateFromId(id) {
    const locale = LOCALE_MAP[lang()] || "en";
    return new Date(Number(id)).toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function setNavLinkText(link, labelKey) {
    const icon = link.querySelector("i, svg");
    const badge = link.querySelector(".badge");
    link.textContent = "";
    if (icon) link.appendChild(icon);
    link.appendChild(document.createTextNode(t(labelKey)));
    if (badge) link.appendChild(badge);
  }

  function translateSidebar() {
    const map = {
      "home.html": "nav.home",
      "index.html": "nav.menu",
      "orders.html": "nav.orders",
      "history.html": "nav.history",
      "partners.html": "nav.partners",
      "settings.html": "nav.settings",
    };

    document.querySelectorAll(".sidebar .nav-link[href]").forEach((link) => {
      const href = link.getAttribute("href") || "";
      const file = href.split("/").pop().split("#")[0];
      if (map[file]) setNavLinkText(link, map[file]);
      if (link.classList.contains("pix-donate-btn")) {
        setNavLinkText(link, "nav.donate");
      }
      if (
        href.includes("login.html") ||
        link.id === "logoutBtn" ||
        link.textContent.trim().toLowerCase().includes("log out") ||
        link.textContent.trim().toLowerCase().includes("sair")
      ) {
        setNavLinkText(link, "nav.logout");
      }
    });

    const mobileLabel = document.querySelector(".cookie-menu-label");
    if (mobileLabel) mobileLabel.textContent = t("nav.mobileMenu");
  }

  function applyI18n() {
    const settings = getSettings();
    document.documentElement.lang = LOCALE_MAP[settings.language] || "en";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = t(key);
      if (el.getAttribute("data-i18n-html") === "true") {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
    });

    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      el.title = t(el.getAttribute("data-i18n-title"));
    });

    document.querySelectorAll("[data-fmt-price]").forEach((el) => {
      const usd = parseFloat(el.getAttribute("data-fmt-price"));
      if (!Number.isNaN(usd)) el.textContent = fmt(usd);
    });

    document.querySelectorAll(".delivery-btn[data-type]").forEach((btn) => {
      const type = normalizeDelivery(btn.dataset.type);
      btn.dataset.type = type;
      const span = btn.querySelector("span");
      if (span) span.textContent = deliveryLabel(type);
    });

    document.querySelectorAll(".tab[data-category]").forEach((tab) => {
      const cat = tab.dataset.category;
      tab.textContent = t(`cat.${cat}`);
    });

    translateSidebar();
  }

  function applyDefaultsToMenu() {
    if (!document.getElementById("products")) return;
    const settings = getSettings();
    const deliveryKey = normalizeDelivery(settings.defaultDelivery);
    document.querySelectorAll(".delivery-btn").forEach((btn) => {
      btn.classList.toggle(
        "active",
        normalizeDelivery(btn.dataset.type) === deliveryKey,
      );
    });
    if (typeof global.applyMenuDefaults === "function") {
      global.applyMenuDefaults(settings);
    }
  }

  function initPage() {
    applyI18n();
    applyDefaultsToMenu();
    if (typeof global.onPurrSettingsChange === "function") {
      global.onPurrSettingsChange();
    }
  }

  global.addEventListener("purrSettingsChanged", () => {
    applyI18n();
    applyDefaultsToMenu();
    if (typeof global.onPurrSettingsChange === "function") {
      global.onPurrSettingsChange();
    }
  });

  global.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) initPage();
  });

  global.PurrSettings = {
    getSettings,
    saveSettings,
    t,
    fmt,
    convertPrice,
    fmtDateFromId,
    deliveryLabel,
    sizeLabel,
    normalizeDelivery,
    normalizeSize,
    applyI18n,
    DELIVERY_KEYS,
    SIZE_KEYS,
    CURRENCIES,
    DEFAULTS,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPage);
  } else {
    setTimeout(initPage, 0);
  }
})(window);
