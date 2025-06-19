

const scriptsInEvents = {

	async событияигра_Event1_Act2(runtime, localVars)
	{
		// Этот код выполняется один раз при старте сцены
		const tg = window.Telegram && Telegram.WebApp;
		runtime.globalVars.InitData = tg ? tg.initData : "";
	},

	async событияигра_Event12_Act2(runtime, localVars)
	{
		const API = "https://script.google.com/macros/s/AKfycbwScLIkaWvwwGtUG0WpFLjfeYYx5IuTIeZ8darIF5bQYbIl0qnogC54gusXXRKiwim6/exec";
		
		fetch(API, {
		  method: "POST",
		  headers: { "Content-Type": "application/json" },
		  body: JSON.stringify({
		    score:  runtime.globalVars.Счет,
		    initData: runtime.globalVars.InitData   // строка от Telegram
		  })
		}).catch(err => console.error(err));
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
