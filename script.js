import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, onAuthStateChanged as onFirebaseAuthStateChanged, signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword, createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword, signOut as firebaseSignOut, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const translations = {
    ar: {
        title: "القمة",
        logo: "القمة",
        loginTitle: "تسجيل الدخول",
        emailLabel: "البريد الإلكتروني",
        passLabel: "كلمة المرور",
        loginBtn: "دخول المحارب",
        signupText: "جاهز للتحدي؟ ",
        signupLink: "سجل الآن",
        regTitle: "حساب بطل جديد",
        nameLabel: "الاسم الكامل",
        regBtn: "انضم للأبطال !",
        loginText: "لديك حساب بالفعل؟ ",
        loginLink: "العودة لدخول المحارب",
        langText: "English",
        successLogin: "مرحباً بك في القمة!",
        successReg: "مرحباً بالبطل الجديد!",
        checking: "جاري التحقق...",
        profileTitle: "استكمال الملف الشخصي",
        male: "ذكر",
        female: "أنثى",
        heightLabel: "الطول (سم)",
        weightLabel: "الوزن الحالي (كجم)",
        saveBtn: "استمرار",
        successProfile: "تم الحفظ!",
        goalTitle: "الهدف الرياضي",
        goalDesc: "اختر مسارك، وسنقوم بتوجيهك للوصول إلى القمة.",
        bulking: "التضخيم وبناء العضل",
        cutting: "التنشيف وحرق الدهون",
        weightloss: "إنقاص الوزن واللياقة",
        targetTitle: "الوزن المستهدف",
        targetDesc: "نحتاج إلى وزنك المستهدف لنحلل احتياجك من السعرات الحرارية ونصمم لك خطتك بدقة.",
        targetWeightLabel: "الوزن المطلوب (كجم)",
        analyzeBtn: "تحليل السعرات والانطلاق",
        successAnalysis: "تم إعداد الخطة بنجاح!",
        step1: "جمع البيانات وتحليلها...",
        step2: "حساب السعرات الحرارية...",
        step3: "بناء الخطة المخصصة...",
        resultTitle: "خطتك النارية جاهزة يا بطل",
        kcalLabel: "سعرة حرارية / اليوم",
        proteinLabel: "بروتين",
        carbsLabel: "كاربوهيدرات",
        fatsLabel: "دهون صحية",
        startJourneyBtn: "ابدأ مسيرتك الآن",
        ageLabel: "العمر",
        dashHi: "مرحباً،",
        remainLabel: "متبقية",
        calTracker: "سعرة حرارية",
        waterTracker: "الماء",
        literUnit: "لتر",
        dailyMacros: "الماكروز اليومية",
        mealsTitle: "الوجبات",
        noMeals: "لم تُضف أي وجبة بعد",
        addMealTitle: "إضافة وجبة",
        mealNamePh: "اسم الوجبة",
        mealCalPh: "السعرات الحرارية",
        mealProtPh: "بروتين",
        mealCarbPh: "كارب",
        mealFatPh: "دهون",
        saveMealBtn: "إضافة الوجبة",
        cancelBtn: "إلغاء",
        quickAddTitle: "إضافة سريعة",
        qm_cal: "سعرة",
        qm_rice: "أرز أبيض",
        qm_chicken: "صدر دجاج مشوي",
        qm_eggs: "بيض مسلوق (2)",
        qm_bread: "خبز أبيض",
        qm_dates: "تمر (3 حبات)",
        qm_yogurt: "زبادي",
        qm_tuna: "تونة معلبة",
        qm_banana: "موز",
        qm_oats: "شوفان",
        qm_milk: "حليب كامل",
        historyTitle: "سجل الأيام السابقة",
        noHistory: "لا يوجد سجل بعد، ابدأ يومك الأول!",
        histCal: "سعرة",
        histWater: "لتر",
        viewTodayMeals: "عرض وجبات اليوم بالتفصيل",
        todayMealsTitle: "وجبات اليوم",
        tdCalLabel: "سعرة حرارية",
        tdProtein: "بروتين",
        tdCarbs: "كارب",
        tdFats: "دهون",
        tdEmpty: "لم تأكل شيء اليوم بعد",
        myMealsTitle: "وجباتي المحفوظة",
        myMealsModalTitle: "قائمة وجباتي المفضلة",
        noFavs: "المفضلة فارغة، احفظ وجباتك لسهولة إضافتها!",
        addFavBtn: "إضافة وجبة للمفضلة +",
        saveFavAction: "حفظ في المفضلة",
        favAddedMsg: "✅ تم إضافة الوجبة لمسيرتك اليومية!",
        logoutTitle: "تسجيل الخروج",
        copyrightText: "© 2026 عبدالله العتيبي"
    },
    en: {
        title: "PEAK",
        logo: "PEAK",
        loginTitle: "Login to Account",
        emailLabel: "Email Address",
        passLabel: "Password",
        loginBtn: "Warrior Login",
        signupText: "Ready for the challenge? ",
        signupLink: "Register Now",
        regTitle: "New Champion Account",
        nameLabel: "Full Name",
        regBtn: "Join the Champions !",
        loginText: "Already have an account? ",
        loginLink: "Back to Login",
        langText: "العربية",
        successLogin: "Welcome to PEAK!",
        successReg: "Welcome new Champion!",
        checking: "Authenticating...",
        profileTitle: "Complete Profile",
        male: "Male",
        female: "Female",
        heightLabel: "Height (cm)",
        weightLabel: "Current Weight (kg)",
        saveBtn: "Continue",
        successProfile: "Saved!",
        goalTitle: "Fitness Goal",
        goalDesc: "Choose your path, and we will guide you to the peak.",
        bulking: "Bulking & Muscle Mass",
        cutting: "Cutting & Fat Loss",
        weightloss: "Weight Loss & Fitness",
        targetTitle: "Target Weight",
        targetDesc: "We need your target weight to analyze calorie adjustments and build your plan.",
        targetWeightLabel: "Target Weight (kg)",
        analyzeBtn: "Analyze Calories & Start",
        successAnalysis: "Diet Plan Prepared!",
        step1: "Analyzing your data...",
        step2: "Computing Caloric Needs...",
        step3: "Finalizing Plan...",
        resultTitle: "Your Fire Plan is Ready, Champ",
        kcalLabel: "Calories / Day",
        proteinLabel: "Protein",
        carbsLabel: "Carbohydrates",
        fatsLabel: "Healthy Fats",
        startJourneyBtn: "Start Your Journey Now",
        ageLabel: "Age",
        dashHi: "Welcome,",
        remainLabel: "remaining",
        calTracker: "Calories",
        waterTracker: "Water",
        literUnit: "Liters",
        dailyMacros: "Daily Macros",
        mealsTitle: "Meals",
        noMeals: "No meals added yet",
        addMealTitle: "Add Meal",
        mealNamePh: "Meal Name",
        mealCalPh: "Calories",
        mealProtPh: "Protein",
        mealCarbPh: "Carbs",
        mealFatPh: "Fats",
        saveMealBtn: "Add Meal",
        cancelBtn: "Cancel",
        quickAddTitle: "Quick Add",
        qm_cal: "cal",
        qm_rice: "White Rice",
        qm_chicken: "Grilled Chicken",
        qm_eggs: "Boiled Eggs (2)",
        qm_bread: "White Bread",
        qm_dates: "Dates (3 pcs)",
        qm_yogurt: "Yogurt",
        qm_tuna: "Canned Tuna",
        qm_banana: "Banana",
        qm_oats: "Oats",
        qm_milk: "Whole Milk",
        historyTitle: "Past Days Log",
        noHistory: "No history yet, start your first day!",
        histCal: "cal",
        histWater: "L",
        viewTodayMeals: "View Today's Meals in Detail",
        todayMealsTitle: "Today's Meals",
        tdCalLabel: "Calories",
        tdProtein: "Protein",
        tdCarbs: "Carbs",
        tdFats: "Fats",
        tdEmpty: "You haven't eaten anything yet today",
        myMealsTitle: "Saved Meals",
        myMealsModalTitle: "My Favorite Meals",
        noFavs: "No favorites yet. Save meals for quick logging!",
        addFavBtn: "Add to Favorites +",
        saveFavAction: "Save as Favorite",
        favAddedMsg: "✅ Meal added to your journey!",
        logoutTitle: "Logout",
        copyrightText: "© 2026 Abdullah Alotaibi"
    }
};

let currentLang = 'ar';
let lastNutrition = null;
let storedUsername = '';
let currentUser = null;
const firebaseConfig = window.__firebaseConfig || {};
const firebaseConfigReady = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId']
    .every((key) => typeof firebaseConfig[key] === 'string' && firebaseConfig[key].trim() !== '');
let firebaseAuth = null;
let db = null;
if (firebaseConfigReady) {
    const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
    firebaseAuth = getAuth(firebaseApp);
    db = getFirestore(firebaseApp);
    setPersistence(firebaseAuth, browserSessionPersistence).catch(() => {});
} else {
    console.error(currentLang === 'ar'
        ? 'إعدادات Firebase غير مكتملة. عبئ window.__firebaseConfig داخل index.html'
        : 'Firebase config is missing. Fill window.__firebaseConfig in index.html');
}

const auth = {
    onAuthStateChanged(callback) {
        if (!firebaseAuth) {
            callback(null);
            return () => {};
        }
        return onFirebaseAuthStateChanged(firebaseAuth, (user) => {
            currentUser = user || null;
            callback(currentUser);
        });
    },
    async signInWithEmailAndPassword(email, password) {
        if (!firebaseAuth) throw new Error(currentLang === 'ar' ? 'يرجى إدخال إعدادات Firebase أولاً' : 'Please set Firebase config first');
        const userCred = await firebaseSignInWithEmailAndPassword(firebaseAuth, (email || '').trim(), password);
        currentUser = userCred.user;
        return userCred;
    },
    async createUserWithEmailAndPassword(email, password) {
        if (!firebaseAuth) throw new Error(currentLang === 'ar' ? 'يرجى إدخال إعدادات Firebase أولاً' : 'Please set Firebase config first');
        const userCred = await firebaseCreateUserWithEmailAndPassword(firebaseAuth, (email || '').trim(), password);
        currentUser = userCred.user;
        return userCred;
    },
    async signOut() {
        if (!firebaseAuth) return;
        await firebaseSignOut(firebaseAuth);
        currentUser = null;
    }
};

// Preset meals database (per serving)
const PRESETS = [
    { key: 'qm_rice', cal: 325, p: 6, c: 72, f: 1 },
    { key: 'qm_chicken', cal: 248, p: 46, c: 0, f: 5 },
    { key: 'qm_eggs', cal: 156, p: 13, c: 1, f: 11 },
    { key: 'qm_bread', cal: 165, p: 5, c: 30, f: 2 },
    { key: 'qm_dates', cal: 167, p: 1, c: 45, f: 0 },
    { key: 'qm_yogurt', cal: 100, p: 17, c: 6, f: 1 },
    { key: 'qm_tuna', cal: 100, p: 22, c: 0, f: 1 },
    { key: 'qm_banana', cal: 105, p: 1, c: 27, f: 0 },
    { key: 'qm_oats', cal: 152, p: 5, c: 27, f: 3 },
    { key: 'qm_milk', cal: 150, p: 8, c: 12, f: 8 }
];

document.addEventListener('DOMContentLoaded', () => {
    // --- Global Data Store ---
    let userData = {
        name: '',
        gender: 'male',
        age: 0,
        height: 0,
        weight: 0,
        goal: '',
        targetWeight: 0,
        profileCompleted: false,
        myMeals: []
    };

    let dash = {
        date: new Date().toISOString().slice(0, 10),
        calTarget: 2000, calEaten: 0,
        pTarget: 150, pEaten: 0,
        cTarget: 200, cEaten: 0,
        fTarget: 60, fEaten: 0,
        waterTarget: 3, waterDrank: 0,
        meals: []
    };

    let history = [];
    let allowProfileFlow = sessionStorage.getItem('allowProfileFlow') === '1';

    function attachGlowEffect(form) {
        form.addEventListener('mousemove', (e) => {
            const rect = form.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            form.style.setProperty('--mouse-x', `${x}px`);
            form.style.setProperty('--mouse-y', `${y}px`);
        });
        form.addEventListener('mouseleave', () => {
            form.style.setProperty('--mouse-x', `50%`);
            form.style.setProperty('--mouse-y', `50%`);
        });
    }

    const forms = document.querySelectorAll('.form-panel');
    forms.forEach(attachGlowEffect);

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const profileForm = document.getElementById('profileForm');
    const goalForm = document.getElementById('goalForm');
    const targetWeightForm = document.getElementById('targetWeightForm');
    const resultScreen = document.getElementById('resultScreen');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const mainContainer = document.getElementById('mainContainer');
    const dashboardContainer = document.getElementById('dashboardContainer');
    let authResolved = false;
    const authFallbackTimer = setTimeout(() => {
        if (authResolved) return;
        if (loadingOverlay) {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => loadingOverlay.style.display = 'none', 300);
        }
        if (mainContainer) mainContainer.style.display = 'flex';
        if (dashboardContainer) dashboardContainer.style.display = 'none';
        document.body.classList.remove('dashboard-active');
        showStep(loginForm);
    }, 6000);

    const showRegisterBtn = document.getElementById('showRegister');
    const showLoginBtn = document.getElementById('showLogin');

    function showStep(showForm) {
        if (typeof showForm === 'string') showForm = document.getElementById(showForm);
        if (!showForm) {
            console.error("showStep: Target form not found", showForm);
            return;
        }
        const allForms = document.querySelectorAll('.form-panel');
        allForms.forEach(f => {
            if (f !== showForm) {
                f.classList.remove('active-form');
                if (!f.classList.contains('hidden-form')) f.classList.add('hidden-form-up');
            }
        });
        showForm.classList.remove('hidden-form', 'hidden-form-up');
        showForm.classList.add('active-form');
        console.log("Navigated to:", showForm.id);
    }

    showRegisterBtn.addEventListener('click', (e) => { e.preventDefault(); showStep(registerForm); });
    showLoginBtn.addEventListener('click', (e) => { e.preventDefault(); showStep(loginForm); });

    // --- Local Sync Helpers ---
    async function syncToFirebase() {
        if (!currentUser) return;
        try {
            await setDoc(doc(db, 'users', currentUser.uid), {
                userData: JSON.parse(JSON.stringify(userData)),
                dash: JSON.parse(JSON.stringify(dash)),
                history: JSON.parse(JSON.stringify(history)),
                email: currentUser.email || '',
                lastUpdated: serverTimestamp()
            }, { merge: true });
        } catch (error) { 
            console.error("Sync Error:", error); 
        }
    }

    async function loadFromFirebase() {
        if (!currentUser) return false;
        try {
            const snap = await getDoc(doc(db, 'users', currentUser.uid));
            if (snap.exists()) {
                const data = snap.data();
                if (data.userData) {
                    userData = { ...userData, ...data.userData };
                    if (!userData.myMeals) userData.myMeals = [];
                }
                
                if (data.history) history = data.history;
                else history = [];
                
                const todayKey = new Date().toISOString().slice(0, 10);
                if (data.dash) {
                    if (data.dash.date === todayKey) {
                        dash = { ...dash, ...data.dash };
                    } else {
                        // Move yesterday to history
                        if (data.dash.date && data.dash.meals?.length > 0) {
                            history.unshift(JSON.parse(JSON.stringify(data.dash)));
                            if (history.length > 30) history.pop();
                        }
                        
                        // Reset for today but keep targets
                        const oldTargets = {
                            calTarget: data.dash.calTarget,
                            pTarget: data.dash.pTarget,
                            cTarget: data.dash.cTarget,
                            fTarget: data.dash.fTarget,
                            waterTarget: data.dash.waterTarget
                        };
                        
                        dash = {
                            ...dash,
                            ...oldTargets,
                            date: todayKey,
                            calEaten: 0, pEaten: 0, cEaten: 0, fEaten: 0,
                            waterDrank: 0, meals: []
                        };
                        
                        // Recalculate targets if missing
                        if (userData.profileCompleted && !dash.calTarget) {
                            const nutrition = calculateNutrition();
                            dash.calTarget = nutrition.calories;
                            dash.pTarget = nutrition.protein;
                            dash.cTarget = nutrition.carbs;
                            dash.fTarget = nutrition.fats;
                            dash.waterTarget = Math.round((userData.weight || 70) * 0.033 * 10) / 10;
                        }
                    }
                } else {
                    dash.date = todayKey;
                    if (userData.profileCompleted) {
                        const nutrition = calculateNutrition();
                        dash.calTarget = nutrition.calories;
                        dash.pTarget = nutrition.protein;
                        dash.cTarget = nutrition.carbs;
                        dash.fTarget = nutrition.fats;
                        dash.waterTarget = Math.round((userData.weight || 70) * 0.033 * 10) / 10;
                    }
                }
                
                return true;
            }
        } catch (e) {
            console.error("Load Error:", e);
        }
        return false;
    }

    // --- Persistence & Auth Observer ---
    auth.onAuthStateChanged(async (user) => {
        authResolved = true;
        clearTimeout(authFallbackTimer);
        const mc = document.getElementById('mainContainer');
        const dc = document.getElementById('dashboardContainer');
        const loader = document.getElementById('loadingOverlay');

        if (user) {
            currentUser = user;
            const found = await loadFromFirebase();
            
            if (found && userData.profileCompleted) {
                const nutrition = calculateNutrition();
                dash.calTarget = dash.calTarget || nutrition.calories;
                dash.pTarget = dash.pTarget || nutrition.protein;
                dash.cTarget = dash.cTarget || nutrition.carbs;
                dash.fTarget = dash.fTarget || nutrition.fats;

                lastNutrition = { 
                    calories: dash.calTarget, 
                    protein: dash.pTarget, 
                    carbs: dash.cTarget, 
                    fats: dash.fTarget 
                };

                mc.style.display = 'none';
                dc.style.display = 'block';
                document.body.classList.add('dashboard-active');
                try {
                    initDashboard(lastNutrition);
                } catch (e) {
                    console.error("Dashboard Init Error:", e);
                    mc.style.display = 'flex';
                    dc.style.display = 'none';
                    showStep(profileForm);
                }
            } else if (found) {
                mc.style.display = 'flex';
                dc.style.display = 'none';
                document.body.classList.remove('dashboard-active');
                
                if (!userData.age || !userData.weight) showStep(profileForm);
                else if (!userData.goal) showStep(goalForm);
                else showStep(targetWeightForm);
            } else if (allowProfileFlow) {
                mc.style.display = 'flex';
                dc.style.display = 'none';
                document.body.classList.remove('dashboard-active');
                showStep(profileForm);
            } else {
                mc.style.display = 'flex';
                dc.style.display = 'none';
                document.body.classList.remove('dashboard-active');
                showStep(profileForm);
            }
        } else {
            currentUser = null;
            mc.style.display = 'flex';
            dc.style.display = 'none';
            document.body.classList.remove('dashboard-active');
            showStep(loginForm);
            console.log("No user session found.");
        }

        setTimeout(() => {
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => loader.style.display = 'none', 300);
            }
        }, 500);
    });

    // --- Logout Handling ---
    const globalLogout = async () => {
        try {
            await auth.signOut();
            allowProfileFlow = false;
            sessionStorage.removeItem('allowProfileFlow');
            location.href = 'index.html'; // Clear URL and reload
        } catch (e) {
            console.error("Logout error:", e);
        }
    };

    document.getElementById('logoutFromProfile').addEventListener('click', (e) => {
        e.preventDefault();
        globalLogout();
    });

    document.getElementById('logoutBtn').addEventListener('click', (e) => {
        globalLogout();
    });


    async function handleSubmissionUI(e, successKey, asyncAction) {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        const originalContent = btn.innerHTML;

        btn.innerHTML = `<span class="loader"></span> ${translations[currentLang].checking}`;
        btn.style.opacity = '0.9';
        btn.style.pointerEvents = 'none';

        try {
            await asyncAction();
            btn.innerHTML = translations[currentLang][successKey];
            btn.style.background = '#00e676';
            btn.style.color = '#fff';
            btn.style.boxShadow = '0 10px 25px -10px #00e676';

            return new Promise(resolve => {
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'auto';
                    btn.style.background = '';
                    btn.style.color = '';
                    btn.style.boxShadow = '';
                    resolve();
                }, 1000);
            });
        } catch (error) {
            btn.innerHTML = currentLang === 'ar' ? "خطأ في العملية" : "Error occurred";
            btn.style.background = '#ff5252';
            console.error(error);
            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'auto';
                btn.style.background = '';
            }, 2000);
            throw error;
        }
    }

    loginForm.addEventListener('submit', async (e) => {
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-password').value;
        try {
            await handleSubmissionUI(e, 'successLogin', async () => {
                await auth.signInWithEmailAndPassword(email, pass);
                // onAuthStateChanged will handle the rest
            });
        } catch (err) { alert(err.message); }
    });

    registerForm.addEventListener('submit', async (e) => {
        const email = document.getElementById('reg-email').value;
        const pass = document.getElementById('reg-password').value;
        const name = document.getElementById('reg-name').value;
        try {
            await handleSubmissionUI(e, 'successReg', async () => {
                allowProfileFlow = true;
                sessionStorage.setItem('allowProfileFlow', '1');
                const userCred = await auth.createUserWithEmailAndPassword(email, pass);
                currentUser = userCred.user;
                userData.name = name;
                await syncToFirebase(); 
            });
        } catch (err) { alert(err.message); }
    });

    profileForm.addEventListener('submit', async (e) => {
        const age = parseInt(document.getElementById('profile-age').value);
        const height = parseInt(document.getElementById('profile-height').value);
        const weight = parseFloat(document.getElementById('profile-weight').value);

        if (age < 10 || age > 100 || height < 50 || height > 250 || weight < 20 || weight > 300) {
            alert(currentLang === 'ar' ? 'يرجى إدخال بيانات منطقية' : 'Please enter valid values');
            return;
        }

        userData.gender = document.querySelector('input[name="gender"]:checked')?.value || 'male';
        userData.age = age;
        userData.height = height;
        userData.weight = weight;
        
        await handleSubmissionUI(e, 'successProfile', async () => { 
            await syncToFirebase(); 
            showStep(goalForm); 
        });
    });

    // Auto advance on goal selection
    const goalRadios = document.querySelectorAll('input[name="goal"]');
    goalRadios.forEach(radio => {
        radio.addEventListener('change', async () => {
            userData.goal = radio.value;
            await syncToFirebase(); // Await sync before moving on
            setTimeout(() => {
                showStep(targetWeightForm);
            }, 500); 
        });
    });

    // --- Calorie & Macro Calculator ---
    function calculateNutrition() {
        const { gender, age, height, weight, goal } = userData;
        
        // Safety checks for NaN or invalid values
        const vWeight = parseFloat(weight) || 70;
        const vHeight = parseFloat(height) || 170;
        const vAge = parseInt(age) || 25;

        // 1) BMR using Mifflin-St Jeor Equation
        let bmr;
        if (gender === 'female') {
            bmr = (10 * vWeight) + (6.25 * vHeight) - (5 * vAge) - 161;
        } else {
            bmr = (10 * vWeight) + (6.25 * vHeight) - (5 * vAge) + 5;
        }

        // 2) TDEE with moderate activity factor (1.55)
        let tdee = bmr * 1.55;

        // 3) Adjust calories based on goal
        let calories;
        switch (goal) {
            case 'bulking': calories = tdee + 500; break;
            case 'cutting': calories = tdee - 500; break;
            case 'weightloss': calories = tdee - 700; break;
            default: calories = tdee;
        }
        calories = Math.round(Math.max(calories, 1200));

        // 4) Macronutrient split
        let pPct, cPct, fPct;
        if (goal === 'bulking') { pPct = 0.30; cPct = 0.50; fPct = 0.20; }
        else if (goal === 'cutting') { pPct = 0.35; cPct = 0.40; fPct = 0.25; }
        else { pPct = 0.30; cPct = 0.40; fPct = 0.30; }

        const protein = Math.round((calories * pPct) / 4);
        const carbs = Math.round((calories * cPct) / 4);
        const fats = Math.round((calories * fPct) / 9);

        return { calories, protein, carbs, fats };
    }

    // Animated count-up effect
    function animateCounter(element, target, duration = 1500) {
        const start = 0;
        const startTime = performance.now();
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (target - start) * eased);
            element.textContent = current;
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    }

    // Show results with animation
    function showResults(nutrition) {
        showStep(resultScreen);
        // Trigger counter animations after the form transition
        setTimeout(() => {
            animateCounter(document.getElementById('res-calories'), nutrition.calories, 2000);
            animateCounter(document.getElementById('res-protein'), nutrition.protein, 1500);
            animateCounter(document.getElementById('res-carbs'), nutrition.carbs, 1500);
            animateCounter(document.getElementById('res-fats'), nutrition.fats, 1500);
        }, 400);
    }

    // Dynamic Animation Analysis for the final step!
    targetWeightForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const targetW = parseFloat(document.getElementById('target-weight-input').value);
        if (!targetW || targetW < 30 || targetW > 300) {
            alert(currentLang === 'ar' ? 'يرجى إدخال وزن مستهدف منطقي' : 'Please enter a valid target weight');
            return;
        }

        userData.targetWeight = targetW;
        userData.profileCompleted = true;
        allowProfileFlow = false;
        sessionStorage.removeItem('allowProfileFlow');

        const btn = e.target.querySelector('button[type="submit"]');
        const originalContent = btn.innerHTML;
        const steps = currentLang === 'ar' ? [translations.ar.step1, translations.ar.step2, translations.ar.step3] : [translations.en.step1, translations.en.step2, translations.en.step3];

        btn.style.opacity = '0.9';
        btn.style.pointerEvents = 'none';

        let stepIndex = 0;
        btn.innerHTML = `<span class="loader"></span> ${steps[stepIndex]}`;

        const interval = setInterval(async () => {
            stepIndex++;
            if (stepIndex < steps.length) {
                btn.innerHTML = `<span class="loader"></span> ${steps[stepIndex]}`;
            } else {
                clearInterval(interval);
                btn.innerHTML = translations[currentLang]['successAnalysis'];
                btn.style.background = '#00e676';

                const nutrition = calculateNutrition();
                lastNutrition = nutrition;

                // Initialize dash target
                dash.calTarget = nutrition.calories;
                dash.pTarget = nutrition.protein;
                dash.cTarget = nutrition.carbs;
                dash.fTarget = nutrition.fats;
                dash.date = new Date().toISOString().slice(0, 10);
                dash.waterTarget = Math.round(userData.weight * 0.033 * 10) / 10;

                await syncToFirebase();

                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'auto';
                    btn.style.background = '';
                    initDashboard(nutrition);
                }, 1800);
            }
        }, 1200);
    });

    document.getElementById('startJourneyBtn').addEventListener('click', () => {
        if (lastNutrition) initDashboard(lastNutrition);
    });

    // ===== DASHBOARD ENGINE =====
    const CIRC = 2 * Math.PI * 68;

    function initDashboard(n) {
        // Ensure dash targets are set if n is missing
        if (!n && !dash.calTarget) {
            n = calculateNutrition();
        }

        if (n) {
            dash.calTarget = n.calories || dash.calTarget || 2000;
            dash.pTarget = n.protein || dash.pTarget || 150;
            dash.cTarget = n.carbs || dash.cTarget || 200;
            dash.fTarget = n.fats || dash.fTarget || 60;
        }

        storedUsername = userData.name || (currentLang === 'ar' ? 'البطل' : 'Champ');
        document.getElementById('dashUsername').textContent = storedUsername;
        const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('dashDate').textContent = new Date().toLocaleDateString(currentLang === 'ar' ? 'ar-SA' : 'en-US', opts);

        document.getElementById('dashPTgt').textContent = dash.pTarget;
        document.getElementById('dashCTgt').textContent = dash.cTarget;
        document.getElementById('dashFTgt').textContent = dash.fTarget;

        document.getElementById('calRing').style.strokeDasharray = CIRC;
        document.getElementById('waterRing').style.strokeDasharray = CIRC;

        document.getElementById('mainContainer').style.display = 'none';
        document.getElementById('dashboardContainer').style.display = 'block';
        document.body.classList.add('dashboard-active');
        updateDash();
        renderMeals();
    }

    function updateDash() {
        const remain = Math.max((dash.calTarget || 2000) - (dash.calEaten || 0), 0);
        document.getElementById('dashCalRemain').textContent = remain;
        const calPct = Math.min((dash.calEaten || 0) / (dash.calTarget || 2000), 1);
        document.getElementById('calRing').style.strokeDashoffset = CIRC * (1 - calPct);

        const wTarget = dash.waterTarget || 3;
        const wDrank = dash.waterDrank || 0;
        const wp = Math.min(wDrank / wTarget, 1);
        document.getElementById('waterRing').style.strokeDashoffset = CIRC * (1 - wp);
        document.getElementById('dashWaterCur').textContent = parseFloat(wDrank.toFixed(2));

        document.getElementById('dashPCur').textContent = dash.pEaten || 0;
        document.getElementById('dashCCur').textContent = dash.cEaten || 0;
        document.getElementById('dashFCur').textContent = dash.fEaten || 0;
        
        const pT = dash.pTarget || 150;
        const cT = dash.cTarget || 200;
        const fT = dash.fTarget || 60;

        document.getElementById('proteinBar').style.width = Math.min((dash.pEaten || 0) / pT * 100, 100) + '%';
        document.getElementById('carbsBar').style.width = Math.min((dash.cEaten || 0) / cT * 100, 100) + '%';
        document.getElementById('fatsBar').style.width = Math.min((dash.fEaten || 0) / fT * 100, 100) + '%';

        syncToFirebase();
    }

    function renderMeals() {
        const list = document.getElementById('mealsList');
        const msg = document.getElementById('noMealsMsg');
        const todayBtn = document.getElementById('todayMealsBtn');
        if (!dash.meals.length) { list.innerHTML = ''; list.appendChild(msg); msg.style.display = ''; todayBtn.style.display = 'none'; return; }
        msg.style.display = 'none';
        todayBtn.style.display = 'flex';
        list.innerHTML = '';
        dash.meals.forEach((m, i) => {
            const d = document.createElement('div'); d.className = 'meal-item';
            d.innerHTML = `<div class="meal-info"><span class="meal-name">${m.name}</span><span class="meal-macros">P:${m.p}g · C:${m.c}g · F:${m.f}g</span></div><div class="meal-right"><span class="meal-cal">${m.cal}</span><button class="meal-del" data-i="${i}">✕</button></div>`;
            list.appendChild(d);
        });
        list.querySelectorAll('.meal-del').forEach(b => b.addEventListener('click', () => {
            const idx = parseInt(b.dataset.i); const m = dash.meals[idx];
            dash.calEaten -= m.cal; dash.pEaten -= m.p; dash.cEaten -= m.c; dash.fEaten -= m.f;
            dash.meals.splice(idx, 1); updateDash(); renderMeals();
        }));
    }

    // Add Meal Modal
    document.getElementById('addMealBtn').addEventListener('click', () => { document.getElementById('mealModal').style.display = 'flex'; });
    document.getElementById('cancelMealBtn').addEventListener('click', () => { document.getElementById('mealModal').style.display = 'none'; clearMealForm(); });
    document.getElementById('mealModal').addEventListener('click', (e) => { if (e.target.id === 'mealModal') { document.getElementById('mealModal').style.display = 'none'; clearMealForm(); } });

    document.getElementById('saveMealBtn').addEventListener('click', () => {
        const name = document.getElementById('mealName').value.trim();
        const cal = parseInt(document.getElementById('mealCal').value) || 0;
        const p = parseInt(document.getElementById('mealProt').value) || 0;
        const c = parseInt(document.getElementById('mealCarb').value) || 0;
        const f = parseInt(document.getElementById('mealFat').value) || 0;
        if (!name || cal <= 0) return;
        dash.calEaten += cal; dash.pEaten += p; dash.cEaten += c; dash.fEaten += f;
        dash.meals.push({ name, cal, p, c, f, time: new Date().toISOString() });
        updateDash(); renderMeals();
        document.getElementById('mealModal').style.display = 'none'; clearMealForm();
    });

    function clearMealForm() {
        ['mealName', 'mealCal', 'mealProt', 'mealCarb', 'mealFat'].forEach(id => document.getElementById(id).value = '');
    }

    // Water: +0.25L per tap
    document.getElementById('addWaterBtn').addEventListener('click', () => {
        dash.waterDrank = Math.round((dash.waterDrank + 0.25) * 100) / 100;
        updateDash();
    });

    // Quick-Add Preset Meals
    document.querySelectorAll('.qm-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.qm);
            const preset = PRESETS[idx];
            const name = translations[currentLang][preset.key];
            dash.calEaten += preset.cal; dash.pEaten += preset.p; dash.cEaten += preset.c; dash.fEaten += preset.f;
            dash.meals.push({ name, cal: preset.cal, p: preset.p, c: preset.c, f: preset.f, time: new Date().toISOString() });
            updateDash(); renderMeals();
            btn.classList.add('qm-added');
            setTimeout(() => btn.classList.remove('qm-added'), 600);
        });
    });

    // ===== TODAY'S MEALS DETAIL =====
    document.getElementById('todayMealsBtn').addEventListener('click', () => {
        renderTodayDetail();
        document.getElementById('todayMealsModal').style.display = 'flex';
    });
    document.getElementById('todayMealsCloseBtn').addEventListener('click', () => {
        document.getElementById('todayMealsModal').style.display = 'none';
    });
    document.getElementById('todayMealsModal').addEventListener('click', (e) => {
        if (e.target.id === 'todayMealsModal') document.getElementById('todayMealsModal').style.display = 'none';
    });

    function renderTodayDetail() {
        const container = document.getElementById('todayMealsDetail');
        const t = translations[currentLang];

        if (!dash.meals.length) {
            container.innerHTML = `<p class="td-empty">${t.tdEmpty}</p>`;
            return;
        }

        container.innerHTML = '';
        dash.meals.forEach((m, i) => {
            const timeStr = m.time
                ? new Date(m.time).toLocaleTimeString(currentLang === 'ar' ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
                : '--:--';

            const card = document.createElement('div');
            card.className = 'td-meal-card';
            card.style.animationDelay = (i * 0.08) + 's';

            card.innerHTML = `
                <div class="td-meal-top">
                    <span class="td-meal-name">${m.name}</span>
                    <span class="td-meal-time">${timeStr}</span>
                </div>
                <div class="td-meal-cal">
                    <div class="td-meal-cal-num">${m.cal}</div>
                    <div class="td-meal-cal-label">${t.tdCalLabel}</div>
                </div>
                <div class="td-meal-macros">
                    <div class="td-macro-chip chip-p">
                        <div class="td-macro-chip-val">${m.p}g</div>
                        <div class="td-macro-chip-label">${t.tdProtein}</div>
                    </div>
                    <div class="td-macro-chip chip-c">
                        <div class="td-macro-chip-val">${m.c}g</div>
                        <div class="td-macro-chip-label">${t.tdCarbs}</div>
                    </div>
                    <div class="td-macro-chip chip-f">
                        <div class="td-macro-chip-val">${m.f}g</div>
                        <div class="td-macro-chip-label">${t.tdFats}</div>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // ===== HISTORY =====
    document.getElementById('historyBtn').addEventListener('click', () => {
        renderHistory();
        document.getElementById('historyModal').style.display = 'flex';
    });
    document.getElementById('historyCloseBtn').addEventListener('click', () => {
        document.getElementById('historyModal').style.display = 'none';
    });
    document.getElementById('historyModal').addEventListener('click', (e) => {
        if (e.target.id === 'historyModal') document.getElementById('historyModal').style.display = 'none';
    });

    function renderHistory() {
        // Fix: Use the global synced 'history' directly
        const list = document.getElementById('historyList');
        const msg = document.getElementById('noHistoryMsg');

        if (!history || !history.length) {
            list.innerHTML = ''; list.appendChild(msg); msg.style.display = '';
            return;
        }
        msg.style.display = 'none';
        list.innerHTML = '';

        const locale = currentLang === 'ar' ? 'ar-SA' : 'en-US';
        const calWord = translations[currentLang].histCal;
        const waterWord = translations[currentLang].histWater;

        history.forEach((day, i) => {
            const dateObj = new Date(day.date + 'T00:00:00');
            const dateStr = dateObj.toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

            const card = document.createElement('div');
            card.className = 'history-day';
            card.style.animationDelay = (i * 0.08) + 's';

            let mealsHTML = '';
            if (day.meals && day.meals.length) {
                day.meals.forEach(m => {
                    mealsHTML += `<div class="history-meal-row"><span>${m.name}</span><span>${m.cal} ${calWord}</span></div>`;
                });
            }

            card.innerHTML = `
                <div class="history-day-date">${dateStr}</div>
                <div class="history-day-stats">
                    <span>🔥 ${day.calEaten || 0} ${calWord}</span>
                    <span>💧 ${parseFloat((day.waterDrank || 0).toFixed(2))} ${waterWord}</span>
                    <span>🍗 P:${day.pEaten || 0}g</span>
                    <span>🍚 C:${day.cEaten || 0}g</span>
                    <span>🥑 F:${day.fEaten || 0}g</span>
                </div>
                <div class="history-day-meals">${mealsHTML || '<span style="color:var(--text-muted);font-size:0.78rem;">—</span>'}</div>
            `;
            list.appendChild(card);
        });
    }

    // ===== SAVED MEALS (MY MEALS) =====
    const myMealsBtn = document.getElementById('myMealsBtn');
    const myMealsModal = document.getElementById('myMealsModal');
    const myMealsCloseBtn = document.getElementById('myMealsCloseBtn');
    const toggleFavFormBtn = document.getElementById('toggleFavForm');
    const favFormWrap = document.getElementById('favFormWrap');
    const saveFavBtn = document.getElementById('saveFavBtn');
    const myMealsList = document.getElementById('myMealsList');

    myMealsBtn.addEventListener('click', () => {
        renderMyMeals();
        myMealsModal.style.display = 'flex';
    });

    myMealsCloseBtn.addEventListener('click', () => {
        myMealsModal.style.display = 'none';
        favFormWrap.style.display = 'none';
    });

    toggleFavFormBtn.addEventListener('click', () => {
        favFormWrap.style.display = favFormWrap.style.display === 'none' ? 'block' : 'none';
    });

    saveFavBtn.addEventListener('click', async () => {
        const name = document.getElementById('favName').value.trim();
        const cal = parseInt(document.getElementById('favCal').value) || 0;
        const p = parseInt(document.getElementById('favProt').value) || 0;
        const c = parseInt(document.getElementById('favCarb').value) || 0;
        const f = parseInt(document.getElementById('favFat').value) || 0;

        if (!name || cal <= 0) return;

        userData.myMeals.push({ name, cal, p, c, f, id: Date.now() });
        await syncToFirebase();

        renderMyMeals();
        favFormWrap.style.display = 'none';
        ['favName', 'favCal', 'favProt', 'favCarb', 'favFat'].forEach(id => document.getElementById(id).value = '');
    });

    function renderMyMeals() {
        if (!userData.myMeals || !userData.myMeals.length) {
            myMealsList.innerHTML = `<p class="empty-state" data-i18n="noFavs">${translations[currentLang].noFavs}</p>`;
            return;
        }

        myMealsList.innerHTML = '';
        userData.myMeals.forEach((m, idx) => {
            const item = document.createElement('div');
            item.className = 'fav-item';
            item.style.animationDelay = (idx * 0.05) + 's';

            item.innerHTML = `
                <div class="fav-info">
                    <span class="fav-name">${m.name}</span>
                    <span class="fav-macros">P:${m.p}g · C:${m.c}g · F:${m.f}g</span>
                </div>
                <div class="fav-cal-box">
                    <span class="fav-cal">${m.cal}</span>
                    <button class="fav-del-btn" data-id="${m.id}">✕</button>
                </div>
            `;

            item.addEventListener('click', (e) => {
                if (e.target.classList.contains('fav-del-btn')) return;
                logFavoriteMeal(m);
            });

            item.querySelector('.fav-del-btn').addEventListener('click', async (e) => {
                e.stopPropagation();
                userData.myMeals = userData.myMeals.filter(meal => meal.id !== m.id);
                await syncToFirebase();
                renderMyMeals();
            });

            myMealsList.appendChild(item);
        });
    }

    function logFavoriteMeal(m) {
        dash.calEaten += m.cal; dash.pEaten += m.p; dash.cEaten += m.c; dash.fEaten += m.f;
        dash.meals.push({ ...m, time: new Date().toISOString() });
        updateDash();
        renderMeals();

        // Visual feedback
        const msg = document.createElement('div');
        msg.className = 'fav-msg show';
        msg.textContent = translations[currentLang].favAddedMsg;
        myMealsList.prepend(msg);

        setTimeout(() => {
            msg.style.opacity = '0';
            setTimeout(() => msg.remove(), 300);
        }, 1500);
    }

    // Language Toggle Logic
    const langToggleBtn = document.getElementById('langToggle');
    const appFooter = document.querySelector('.app-footer');
    let lastScrollY = window.scrollY;

    function updateFooterVisibility() {
        if (!appFooter) return;
        const currentScrollY = window.scrollY;
        if (currentScrollY <= 8 || currentScrollY < lastScrollY) {
            appFooter.classList.remove('visible');
        } else if (currentScrollY > lastScrollY) {
            appFooter.classList.add('visible');
        }
        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', updateFooterVisibility, { passive: true });
    updateFooterVisibility();

    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';

        document.documentElement.lang = currentLang;
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

        // Update innerText
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang] && translations[currentLang][key]) {
                el.innerText = translations[currentLang][key];
            }
        });

        // Update titles
        const titleElements = document.querySelectorAll('[data-i18n-title]');
        titleElements.forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            if (translations[currentLang] && translations[currentLang][key]) {
                el.setAttribute('title', translations[currentLang][key]);
            }
        });

        // Refresh dashboard UI if active
        if (document.body.classList.contains('dashboard-active')) {
            const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            document.getElementById('dashDate').textContent = new Date().toLocaleDateString(currentLang === 'ar' ? 'ar-SA' : 'en-US', opts);
            renderMeals(); // Refresh meals to update delete buttons/text
        }
    });
});
