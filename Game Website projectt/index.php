<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dark Pixel</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <?php
    session_start();
    $username = isset($_SESSION['name']) ? $_SESSION['name'] : '';
    ?>

    <!--header section starts-->
    <header class="header">
        <section class="flex">
            <a href="" class="logo"><i class="fa fa-trophy"></i> Games</a>

            <nav class="navbar">
                <a href="#home">home</a>
                <a href="#about">about us</a>
                <a href="#faq">faq</a>
                <a href="#feedback">feedback</a>
                <a href="#contact">contact</a>
            </nav>

            <a href="login/indexlog.php" class="btn">sign up</a>
        </section>
    </header>
    <!--header section ends-->

    <div id="menu-btn" class="fa fa-bars-staggered"></div>

    <!--home section-->
    <div class="home" id="home">
        <section class="flex">
            <div class="content">
                <h3>
                    <span>Welcome<?php if (!empty($username)) echo ', ' . htmlspecialchars($username); ?></span>
                    To Our Game Website
                </h3>

                <p>Our website offers three exciting games for you to enjoy! Have fun playing them!</p>

                <a href="#games" class="btn">play now</a>
            </div>

            <div class="image">
                <img src="n1.png" alt="">
            </div>
        </section>
    </div>

    <!--about section-->
    <div class="about" id="about">
        <section class="flex">
            <div class="image">
                <img src="about us.JPG" alt="About Us">
            </div>

            <div class="content">
                <h3>about us</h3>
                <p>This is our game website where fun meets excitement. Explore and enjoy a world of thrilling games designed just for you.</p>
                <a href="#" class="btn">Read More</a>
            </div>
        </section>
    </div>

    <!--games section-->
    <section class="top-games" id="games">
        <div class="box-container">
            <div class="box">
                <a href="index1.html" target="_blank"><img src="game1.jpg" alt="Game 1"></a>
            </div>

            <div class="box">
                <a href="index2.html" target="_blank"><img src="game2.jpg" alt="Game 2"></a>
            </div>

            <div class="box">
                <a href="index5.html" target="_blank"><img src="Memory Cards.PNG" alt="Game 5"></a>
            </div>
        </div>
    </section>

    <!--faq section-->
    <div class="faq" id="faq">
        <section class="box-container">
            <h1 class="heading"><span>f</span>requently <span>a</span>sked <span>q</span>uestions</h1>

            <div class="box">
                <div class="title">
                    <h3>how to play?</h3>
                    <i class="fa fa-minus"></i>
                </div>
                <div class="content active">Choose a game, click on it, and follow the on-screen instructions.</div>
            </div>

            <div class="box">
                <div class="title">
                    <h3>Do I need an account?</h3>
                    <i class="fa fa-plus"></i>
                </div>
                <div class="content">No, but creating one saves your progress.</div>
            </div>

            <div class="box">
                <div class="title">
                    <h3>Age restrictions?</h3>
                    <i class="fa fa-plus"></i>
                </div>
                <div class="content">Games are suitable for all ages.</div>
            </div>

            <div class="box">
                <div class="title">
                    <h3>Premium features?</h3>
                    <i class="fa fa-plus"></i>
                </div>
                <div class="content">Some games include optional upgrades.</div>
            </div>

            <div class="box">
                <div class="title">
                    <h3>Need plugins?</h3>
                    <i class="fa fa-plus"></i>
                </div>
                <div class="content">No plugins needed. Everything runs in your browser.</div>
            </div>
        </section>
    </div>

    <!--feedback section-->
    <div class="feedback" id="feedback">
        <section class="box-container">
            <h1 class="heading"><span>P</span>layer <span>F</span>eedback</h1>

            <div class="feedback-form">

                <!-- FEEDBACK DISPLAY BOX (UPDATED + VISIBLE TEXT) -->
                <div id="feedback-message" style="display:none;">
                    <div class="alert-box"
                        style="background: var(--bg-color); padding: 2rem; border-radius: 0.5rem; margin-bottom: 2rem; text-align: center;">

                        <h3 style="color:#fff; font-size:2rem;"></h3>
                        <p style="color:#fff; font-size:1.4rem; line-height:1.6;"></p>

                        <button onclick="hideFeedbackMessage()" class="btn" style="margin-top:1rem;">OK</button>
                    </div>
                </div>

                <!-- FEEDBACK FORM (NO DATABASE) -->
                <form id="feedbackForm">
                    <div class="input-group">
                        <input type="text" name="name" placeholder="Your Name" required>
                    </div>

                    <div class="input-group">
                        <select name="rating" required>
                            <option value="" disabled selected>Rate your experience</option>
                            <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
                            <option value="4">⭐⭐⭐⭐ - Very Good</option>
                            <option value="3">⭐⭐⭐ - Good</option>
                            <option value="2">⭐⭐ - Fair</option>
                            <option value="1">⭐ - Poor</option>
                        </select>
                    </div>

                    <div class="input-group">
                        <textarea name="message" rows="5" placeholder="Your feedback..." required></textarea>
                    </div>

                    <button type="submit" class="btn">Submit Feedback</button>
                </form>

            </div>
        </section>
    </div>

    <!--footer-->
    <footer class="footer">
        <section class="box-container" id="contact">
            <div class="box">
                <h3>quick links</h3>
                <a class="link" href="#home">home</a>
                <a class="link" href="#about">about us</a>
                <a class="link" href="#faq">faq</a>
            </div>

            <div class="box">
                <h3>terms of use</h3>
                <p>By using this website you agree to our rules and policies.</p>
                <div class="share-links">
                    <a href="#" class="fab fa-youtube"></a>
                    <a href="#" class="fab fa-linkedin"></a>
                    <a href="#" class="fab fa-github"></a>
                    <a href="#" class="fab fa-discord"></a>
                </div>
            </div>

            <div class="box">
                <h3>Did You Know?</h3>
                <p class="info">The first video game was Tennis for Two (1958), shown on an oscilloscope.</p>
            </div>
        </section>

        <section class="credit">
            <p>created by <span>Danita, Jumana, Rameil</span></p>
            <p>🌟 Thanks for playing with us! © 2025</p>
        </section>
    </footer>

    <!--custom js file-->
    <script src="script.js"></script>

</body>
</html>
