const translations = {
  en: {
    // Navigation
    employees: 'Employees',
    addNew: 'Add New',
    editEmployee: 'Edit Employee',
    addEmployee: 'Add Employee',
    employeeListTitle: 'Employee List',

    // Page titles
    employeeList: 'Employee List',
    pageNotFound: 'Page Not Found',
    pageNotFoundSubtitle:
      "The page you're looking for doesn't exist or has been moved.",
    goToEmployeeList: 'Go to Employee List',

    // Form labels and placeholders
    firstName: 'First Name',
    lastName: 'Last Name',
    dateOfEmployment: 'Date of Employment',
    dateOfBirth: 'Date of Birth',
    phone: 'Phone',
    email: 'Email',
    department: 'Department',
    position: 'Position',
    pleaseSelect: 'Please Select',

    // Form validation messages
    firstNameRequired: 'First name is required',
    firstNameMinLength: 'First name must be at least 2 characters',
    lastNameRequired: 'Last name is required',
    lastNameMinLength: 'Last name must be at least 2 characters',
    dateOfEmploymentRequired: 'Date of employment is required',
    dateOfEmploymentFuture: 'Date of employment cannot be in the future',
    dateOfBirthRequired: 'Date of birth is required',
    dateOfBirthAge: 'Employee must be between 18 and 100 years old',
    phoneRequired: 'Phone number is required',
    phoneInvalid: 'Please enter a valid phone number',
    emailRequired: 'Email is required',
    emailInvalid: 'Please enter a valid email address',
    departmentRequired: 'Department is required',
    positionRequired: 'Position is required',

    // Buttons
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    proceed: 'Proceed',
    close: 'Close',

    // Table headers
    actions: 'Actions',

    // Search and pagination
    searchPlaceholder: 'Search by name, department, email, or phone...',
    pageSize: 'Page size:',
    showingOf: 'Showing {filtered} of {total} employees',

    // View modes
    listView: 'List View',
    gridView: 'Grid View',

    // Confirmation messages
    areYouSure: 'Are you sure?',
    deleteEmployeeConfirm:
      'Selected Employee record of {firstName} {lastName} will be deleted',
    deleteEmployeeConfirmOld:
      'Are you sure you want to delete {firstName} {lastName}? This action cannot be undone.',
    updateEmployeeConfirm:
      'Are you sure you want to update this employee record?',

    // Modal
    modalTitle: 'Are you sure?',

    // Fallback 404
    fallback404Title: 'Page Not Found',
    fallback404Subtitle:
      "The page you're looking for doesn't exist or has been moved.",

    // Departments
    analytics: 'Analytics',
    tech: 'Tech',

    // Positions
    junior: 'Junior',
    medior: 'Medior',
    senior: 'Senior',
  },

  tr: {
    // Navigation
    employees: 'Çalışanlar',
    addNew: 'Yeni Ekle',
    editEmployee: 'Çalışan Düzenle',
    addEmployee: 'Çalışan Ekle',
    employeeListTitle: 'Çalışan Listesi',

    // Page titles
    employeeList: 'Çalışan Listesi',
    pageNotFound: 'Sayfa Bulunamadı',
    pageNotFoundSubtitle: 'Aradığınız sayfa mevcut değil veya taşınmış.',
    goToEmployeeList: 'Çalışan Listesine Git',

    // Form labels and placeholders
    firstName: 'Ad',
    lastName: 'Soyad',
    dateOfEmployment: 'İşe Başlama Tarihi',
    dateOfBirth: 'Doğum Tarihi',
    phone: 'Telefon',
    email: 'E-posta',
    department: 'Departman',
    position: 'Pozisyon',
    pleaseSelect: 'Lütfen Seçin',

    // Form validation messages
    firstNameRequired: 'Ad gereklidir',
    firstNameMinLength: 'Ad en az 2 karakter olmalıdır',
    lastNameRequired: 'Soyad gereklidir',
    lastNameMinLength: 'Soyad en az 2 karakter olmalıdır',
    dateOfEmploymentRequired: 'İşe başlama tarihi gereklidir',
    dateOfEmploymentFuture: 'İşe başlama tarihi gelecekte olamaz',
    dateOfBirthRequired: 'Doğum tarihi gereklidir',
    dateOfBirthAge: 'Çalışan 18 ile 100 yaş arasında olmalıdır',
    phoneRequired: 'Telefon numarası gereklidir',
    phoneInvalid: 'Lütfen geçerli bir telefon numarası girin',
    emailRequired: 'E-posta gereklidir',
    emailInvalid: 'Lütfen geçerli bir e-posta adresi girin',
    departmentRequired: 'Departman gereklidir',
    positionRequired: 'Pozisyon gereklidir',

    // Buttons
    save: 'Kaydet',
    cancel: 'İptal',
    edit: 'Düzenle',
    delete: 'Sil',
    proceed: 'Devam Et',
    close: 'Kapat',

    // Table headers
    actions: 'İşlemler',

    // Search and pagination
    searchPlaceholder: 'Ad, departman, e-posta veya telefon ile ara...',
    pageSize: 'Sayfa boyutu:',
    showingOf: '{filtered} / {total} çalışan gösteriliyor',

    // View modes
    listView: 'Liste Görünümü',
    gridView: 'Grid Görünümü',

    // Confirmation messages
    areYouSure: 'Emin misiniz?',
    deleteEmployeeConfirm: '{firstName} {lastName} çalışanının kaydı silinecek',
    deleteEmployeeConfirmOld:
      '{firstName} {lastName} çalışanını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
    updateEmployeeConfirm:
      'Bu çalışan kaydını güncellemek istediğinizden emin misiniz?',

    // Modal
    modalTitle: 'Emin misiniz?',

    // Fallback 404
    fallback404Title: 'Sayfa Bulunamadı',
    fallback404Subtitle: 'Aradığınız sayfa mevcut değil veya taşınmış.',

    // Departments
    analytics: 'Analitik',
    tech: 'Teknoloji',

    // Positions
    junior: 'Junior',
    medior: 'Medior',
    senior: 'Senior',
  },
};

class I18nService {
  constructor() {
    this.currentLanguage = this._detectLanguage();
    this._setupLanguageChangeListener();
  }

  _detectLanguage() {
    // Read from root HTML lang attribute
    const htmlLang = document.documentElement.lang;
    if (htmlLang && (htmlLang === 'tr' || htmlLang === 'en')) {
      return htmlLang;
    }

    // Fallback to browser language
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang && browserLang.startsWith('tr')) {
      return 'tr';
    }

    // Default to English
    return 'en';
  }

  _setupLanguageChangeListener() {
    // Watch for changes in the HTML lang attribute
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'lang'
        ) {
          const newLang = document.documentElement.lang;
          if (newLang && (newLang === 'tr' || newLang === 'en')) {
            this.currentLanguage = newLang;
            this._notifyLanguageChange();
          }
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
    });
  }

  _notifyLanguageChange() {
    // Dispatch a custom event to notify components of language change
    window.dispatchEvent(
      new CustomEvent('languageChanged', {
        detail: {language: this.currentLanguage},
      })
    );
  }

  t(key, params = {}) {
    const translation =
      translations[this.currentLanguage]?.[key] || translations.en[key] || key;

    if (Object.keys(params).length === 0) {
      return translation;
    }

    // Replace placeholders like {firstName} with actual values
    return translation.replace(/\{(\w+)\}/g, (match, paramKey) => {
      return params[paramKey] || match;
    });
  }

  getCurrentLanguage() {
    return this.currentLanguage;
  }

  setLanguage(language) {
    if (language === 'tr' || language === 'en') {
      document.documentElement.lang = language;
      this.currentLanguage = language;
      this._notifyLanguageChange();
    }
  }

  // Helper method to get all available languages
  getAvailableLanguages() {
    return Object.keys(translations);
  }
}

// Create a singleton instance
export const i18n = new I18nService();

// Export the service class for testing purposes
export {I18nService};
