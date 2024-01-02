<div class="background">
	{#each Array(50) as _, i}
		<span />
	{/each}
</div>

<style>
	@keyframes move {
		100% {
			transform: translate3d(0, 0, 1px) rotate(360deg);
		}
	}

	.background {
		position: fixed;
		width: 100dvw;
		height: 100lvh;
		top: 0;
		left: 0;
		background: #000000;
		overflow: hidden;
		z-index: -20;
	}

	.background span {
		width: 1vmin;
		height: 1vmin;
		border-radius: 1vmin;
		backface-visibility: hidden;
		position: absolute;
		animation: move;
		animation-duration: 1;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
	}

	.background span:nth-child(0) {
		color: #6b21a8;
		top: 13%;
		left: 47%;
		animation-duration: 345s;
		animation-delay: -139s;
		transform-origin: -17vw 22vh;
		box-shadow: 2vmin 0 0.3106576042047612vmin currentColor;
	}
	.background span:nth-child(1) {
		color: #7e22ce;
		top: 3%;
		left: 64%;
		animation-duration: 143s;
		animation-delay: -72s;
		transform-origin: 17vw -6vh;
		box-shadow: -2vmin 0 0.4671897365993368vmin currentColor;
	}
	.background span:nth-child(2) {
		color: #7e22ce;
		top: 60%;
		left: 82%;
		animation-duration: 353s;
		animation-delay: -105s;
		transform-origin: -1vw -22vh;
		box-shadow: 2vmin 0 0.6898029886069458vmin currentColor;
	}
	.background span:nth-child(3) {
		color: #6b21a8;
		top: 80%;
		left: 95%;
		animation-duration: 150s;
		animation-delay: -82s;
		transform-origin: 6vw 9vh;
		box-shadow: 2vmin 0 1.2372910918571849vmin currentColor;
	}
	.background span:nth-child(4) {
		color: #9333ea;
		top: 85%;
		left: 44%;
		animation-duration: 36s;
		animation-delay: -76s;
		transform-origin: 21vw -12vh;
		box-shadow: -2vmin 0 0.9230428848156488vmin currentColor;
	}
	.background span:nth-child(5) {
		color: #6b21a8;
		top: 65%;
		left: 58%;
		animation-duration: 149s;
		animation-delay: -447s;
		transform-origin: -5vw -11vh;
		box-shadow: -2vmin 0 0.9628201502968299vmin currentColor;
	}
	.background span:nth-child(6) {
		color: #7e22ce;
		top: 1%;
		left: 54%;
		animation-duration: 130s;
		animation-delay: -55s;
		transform-origin: 3vw -19vh;
		box-shadow: 2vmin 0 0.3679824393051965vmin currentColor;
	}
	.background span:nth-child(7) {
		color: #6b21a8;
		top: 3%;
		left: 29%;
		animation-duration: 400s;
		animation-delay: -215s;
		transform-origin: 9vw -3vh;
		box-shadow: 2vmin 0 1.1025949419494074vmin currentColor;
	}
	.background span:nth-child(8) {
		color: #9333ea;
		top: 7%;
		left: 64%;
		animation-duration: 402s;
		animation-delay: -63s;
		transform-origin: -14vw -22vh;
		box-shadow: -2vmin 0 1.008236632819761vmin currentColor;
	}
	.background span:nth-child(9) {
		color: #7e22ce;
		top: 64%;
		left: 78%;
		animation-duration: 458s;
		animation-delay: -434s;
		transform-origin: -19vw -8vh;
		box-shadow: 2vmin 0 1.077684727910858vmin currentColor;
	}
	.background span:nth-child(10) {
		color: #7e22ce;
		top: 68%;
		left: 10%;
		animation-duration: 145s;
		animation-delay: -120s;
		transform-origin: 0vw -16vh;
		box-shadow: 2vmin 0 0.25141563122631294vmin currentColor;
	}
	.background span:nth-child(11) {
		color: #9333ea;
		top: 13%;
		left: 89%;
		animation-duration: 422s;
		animation-delay: -214s;
		transform-origin: -14vw -14vh;
		box-shadow: 2vmin 0 0.6750872430969644vmin currentColor;
	}
	.background span:nth-child(12) {
		color: #7e22ce;
		top: 11%;
		left: 100%;
		animation-duration: 340s;
		animation-delay: -84s;
		transform-origin: 24vw 14vh;
		box-shadow: 2vmin 0 0.6875014512403843vmin currentColor;
	}
	.background span:nth-child(13) {
		color: #9333ea;
		top: 14%;
		left: 37%;
		animation-duration: 375s;
		animation-delay: -311s;
		transform-origin: -21vw -24vh;
		box-shadow: 2vmin 0 0.353863717670315vmin currentColor;
	}
	.background span:nth-child(14) {
		color: #6b21a8;
		top: 12%;
		left: 79%;
		animation-duration: 153s;
		animation-delay: -114s;
		transform-origin: 4vw -20vh;
		box-shadow: 2vmin 0 1.0762497326029963vmin currentColor;
	}
	.background span:nth-child(15) {
		color: #9333ea;
		top: 42%;
		left: 75%;
		animation-duration: 331s;
		animation-delay: -97s;
		transform-origin: 5vw -18vh;
		box-shadow: 2vmin 0 1.0016628047649931vmin currentColor;
	}
	.background span:nth-child(16) {
		color: #6b21a8;
		top: 72%;
		left: 56%;
		animation-duration: 16s;
		animation-delay: -423s;
		transform-origin: 7vw 25vh;
		box-shadow: 2vmin 0 0.9149258078082527vmin currentColor;
	}
	.background span:nth-child(17) {
		color: #9333ea;
		top: 7%;
		left: 10%;
		animation-duration: 84s;
		animation-delay: -226s;
		transform-origin: 10vw 24vh;
		box-shadow: 2vmin 0 1.107071246001048vmin currentColor;
	}
	.background span:nth-child(18) {
		color: #7e22ce;
		top: 68%;
		left: 18%;
		animation-duration: 458s;
		animation-delay: -204s;
		transform-origin: 22vw -23vh;
		box-shadow: 2vmin 0 0.4796242677782069vmin currentColor;
	}
	.background span:nth-child(19) {
		color: #6b21a8;
		top: 17%;
		left: 16%;
		animation-duration: 421s;
		animation-delay: -143s;
		transform-origin: -17vw -5vh;
		box-shadow: 2vmin 0 0.8432614972232035vmin currentColor;
	}
	.background span:nth-child(20) {
		color: #6b21a8;
		top: 40%;
		left: 83%;
		animation-duration: 292s;
		animation-delay: -477s;
		transform-origin: 15vw -24vh;
		box-shadow: 2vmin 0 1.0417902549393077vmin currentColor;
	}
	.background span:nth-child(21) {
		color: #6b21a8;
		top: 6%;
		left: 56%;
		animation-duration: 288s;
		animation-delay: -420s;
		transform-origin: -7vw 16vh;
		box-shadow: 2vmin 0 0.9760476917034044vmin currentColor;
	}
	.background span:nth-child(22) {
		color: #7e22ce;
		top: 43%;
		left: 68%;
		animation-duration: 222s;
		animation-delay: -29s;
		transform-origin: 14vw 2vh;
		box-shadow: 2vmin 0 0.9572539949907081vmin currentColor;
	}
	.background span:nth-child(23) {
		color: #6b21a8;
		top: 78%;
		left: 5%;
		animation-duration: 440s;
		animation-delay: -80s;
		transform-origin: -22vw 3vh;
		box-shadow: -2vmin 0 0.7920685074471387vmin currentColor;
	}
	.background span:nth-child(24) {
		color: #9333ea;
		top: 46%;
		left: 88%;
		animation-duration: 350s;
		animation-delay: -348s;
		transform-origin: 24vw -17vh;
		box-shadow: 2vmin 0 0.6899108409996644vmin currentColor;
	}
	.background span:nth-child(25) {
		color: #7e22ce;
		top: 35%;
		left: 48%;
		animation-duration: 146s;
		animation-delay: -269s;
		transform-origin: 7vw -4vh;
		box-shadow: -2vmin 0 0.9518875445421285vmin currentColor;
	}
	.background span:nth-child(26) {
		color: #9333ea;
		top: 4%;
		left: 59%;
		animation-duration: 134s;
		animation-delay: -315s;
		transform-origin: 14vw 1vh;
		box-shadow: -2vmin 0 1.2006131648327618vmin currentColor;
	}
	.background span:nth-child(27) {
		color: #6b21a8;
		top: 83%;
		left: 22%;
		animation-duration: 46s;
		animation-delay: -365s;
		transform-origin: 6vw 16vh;
		box-shadow: -2vmin 0 0.7156559052239075vmin currentColor;
	}
	.background span:nth-child(28) {
		color: #9333ea;
		top: 87%;
		left: 77%;
		animation-duration: 437s;
		animation-delay: -18s;
		transform-origin: -15vw 3vh;
		box-shadow: 2vmin 0 1.0896815728929745vmin currentColor;
	}
	.background span:nth-child(29) {
		color: #7e22ce;
		top: 100%;
		left: 66%;
		animation-duration: 455s;
		animation-delay: -115s;
		transform-origin: -6vw 16vh;
		box-shadow: 2vmin 0 0.4566258640980082vmin currentColor;
	}
	.background span:nth-child(30) {
		color: #7e22ce;
		top: 65%;
		left: 4%;
		animation-duration: 168s;
		animation-delay: -276s;
		transform-origin: 21vw 18vh;
		box-shadow: 2vmin 0 0.8701266698261377vmin currentColor;
	}
	.background span:nth-child(31) {
		color: #7e22ce;
		top: 45%;
		left: 3%;
		animation-duration: 213s;
		animation-delay: -361s;
		transform-origin: 3vw 16vh;
		box-shadow: 2vmin 0 0.8515535424166513vmin currentColor;
	}
	.background span:nth-child(32) {
		color: #7e22ce;
		top: 44%;
		left: 74%;
		animation-duration: 271s;
		animation-delay: -283s;
		transform-origin: 21vw 25vh;
		box-shadow: 2vmin 0 0.8388765741173504vmin currentColor;
	}
	.background span:nth-child(33) {
		color: #7e22ce;
		top: 7%;
		left: 92%;
		animation-duration: 84s;
		animation-delay: -456s;
		transform-origin: 24vw 15vh;
		box-shadow: 2vmin 0 1.2431760771533695vmin currentColor;
	}
	.background span:nth-child(34) {
		color: #6b21a8;
		top: 95%;
		left: 19%;
		animation-duration: 444s;
		animation-delay: -446s;
		transform-origin: -3vw -12vh;
		box-shadow: -2vmin 0 0.46838617875431754vmin currentColor;
	}
	.background span:nth-child(35) {
		color: #9333ea;
		top: 75%;
		left: 97%;
		animation-duration: 215s;
		animation-delay: -148s;
		transform-origin: 10vw -3vh;
		box-shadow: 2vmin 0 0.7339315294706414vmin currentColor;
	}
	.background span:nth-child(36) {
		color: #7e22ce;
		top: 9%;
		left: 87%;
		animation-duration: 258s;
		animation-delay: -431s;
		transform-origin: 14vw 25vh;
		box-shadow: 2vmin 0 1.115682239613779vmin currentColor;
	}
	.background span:nth-child(37) {
		color: #6b21a8;
		top: 63%;
		left: 36%;
		animation-duration: 418s;
		animation-delay: -369s;
		transform-origin: 15vw 10vh;
		box-shadow: 2vmin 0 0.6999919100885136vmin currentColor;
	}
	.background span:nth-child(38) {
		color: #7e22ce;
		top: 75%;
		left: 28%;
		animation-duration: 200s;
		animation-delay: -118s;
		transform-origin: 7vw 8vh;
		box-shadow: 2vmin 0 0.7169162073350902vmin currentColor;
	}
	.background span:nth-child(39) {
		color: #9333ea;
		top: 40%;
		left: 48%;
		animation-duration: 290s;
		animation-delay: -89s;
		transform-origin: 24vw -3vh;
		box-shadow: -2vmin 0 1.1478841753398776vmin currentColor;
	}
	.background span:nth-child(40) {
		color: #6b21a8;
		top: 41%;
		left: 96%;
		animation-duration: 233s;
		animation-delay: -403s;
		transform-origin: -21vw -13vh;
		box-shadow: -2vmin 0 1.1321939602602795vmin currentColor;
	}
	.background span:nth-child(41) {
		color: #9333ea;
		top: 11%;
		left: 98%;
		animation-duration: 82s;
		animation-delay: -228s;
		transform-origin: -24vw -12vh;
		box-shadow: 2vmin 0 1.2237672916169422vmin currentColor;
	}
	.background span:nth-child(42) {
		color: #9333ea;
		top: 92%;
		left: 33%;
		animation-duration: 431s;
		animation-delay: -341s;
		transform-origin: -6vw -16vh;
		box-shadow: 2vmin 0 0.4641853039991989vmin currentColor;
	}
	.background span:nth-child(43) {
		color: #9333ea;
		top: 60%;
		left: 98%;
		animation-duration: 193s;
		animation-delay: -46s;
		transform-origin: 19vw 1vh;
		box-shadow: -2vmin 0 0.38637226695305726vmin currentColor;
	}
	.background span:nth-child(44) {
		color: #6b21a8;
		top: 76%;
		left: 62%;
		animation-duration: 445s;
		animation-delay: -326s;
		transform-origin: 8vw 9vh;
		box-shadow: -2vmin 0 1.2495387838605132vmin currentColor;
	}
	.background span:nth-child(45) {
		color: #7e22ce;
		top: 61%;
		left: 9%;
		animation-duration: 258s;
		animation-delay: -278s;
		transform-origin: -9vw -6vh;
		box-shadow: -2vmin 0 0.2670421266804234vmin currentColor;
	}
	.background span:nth-child(46) {
		color: #6b21a8;
		top: 87%;
		left: 9%;
		animation-duration: 344s;
		animation-delay: -362s;
		transform-origin: 14vw 10vh;
		box-shadow: 2vmin 0 0.939590330502825vmin currentColor;
	}
	.background span:nth-child(47) {
		color: #6b21a8;
		top: 74%;
		left: 100%;
		animation-duration: 165s;
		animation-delay: -249s;
		transform-origin: -9vw 10vh;
		box-shadow: -2vmin 0 0.6614061977794194vmin currentColor;
	}
	.background span:nth-child(48) {
		color: #6b21a8;
		top: 83%;
		left: 54%;
		animation-duration: 56s;
		animation-delay: -90s;
		transform-origin: 17vw 5vh;
		box-shadow: -2vmin 0 1.1401442091318734vmin currentColor;
	}
	.background span:nth-child(49) {
		color: #9333ea;
		top: 29%;
		left: 92%;
		animation-duration: 58s;
		animation-delay: -89s;
		transform-origin: -23vw -19vh;
		box-shadow: -2vmin 0 0.6969157796810322vmin currentColor;
	}
</style>
