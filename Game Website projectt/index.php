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
    $username = isset($_SESSION['name']) ? $_SESSION['name'] : null;
    ?>

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

            <?php if ($username): ?>

                <span class="user-tag">👤 <?php echo htmlspecialchars($username); ?></span>

                <a href="logout.php" class="btn logout">Logout</a>

            <?php else: ?>

                <a href="login/indexlog.php" class="btn">Sign In</a>

            <?php endif; ?>

        </section>

        <style>
            .user-tag {
                color: #fff !important;
                font-weight: bold;
                margin-right: 15px;
                font-size: 14px;
                display: inline-block;
            }
        </style>

    </header>

    <div id="menu-btn" class="fa fa-bars-staggered"> </div>

    <div class="home" id="home">
        <section class="flex">

            <div class="content">
                <h3>
                    <span>Welcome<?php if (!empty($username)) echo ', ' . htmlspecialchars($username); ?></span>
                    To Our Game Website
                </h3>
                <p> Our website offers three exciting games for you to enjoy! We hope you have a great time playing
                    them!</p>
                <a href="#games" class="btn">play now</a>
            </div>

            <div class="image">
                <img src="n1.png" alt="">
            </div>

        </section>
    </div>

    <div class="about" id="about">
        <section class="flex">

            <div class="image">
                <img src="about us.JPG" alt="About Us">
            </div>

            <div class="content">
                <h3>about us</h3>
                <p>This is our game website, where fun meets excitement! Explore, play, and enjoy a world of thrilling
                    games designed just for you.</p>
                <a href="#" class="btn">Read More</a>
            </div>

        </section>
    </div>

    <section class="top-games" id="games">

        <div class="box-container">
            <div class="box">
                <a href="index1.html" target="_blank">
                    <img src="game1.jpg" alt="Game 1">
                </a>
            </div>

            <div class="box">
                <a href="index2.html" target="_blank">
                    <img src="game2.jpg" alt="Game 2">
                </a>
            </div>

            <div class="box">
                <a href="index5.html" target="_blank">
                    <img src="Memory Cards.PNG" alt="Game 5">
                </a>
            </div>

        </div>

    </section>

    <div class="faq" id="faq">
        <section class="box-container">
            <h1 class="heading"><span>f</span>requently<span> a</span>sked <span>q</span>uestions</h1>
            <div class="box">
                <div class="title">
                    <h3>how to play?</h3>
                    <i class="fa fa-minus"></i>
                </div>
                <div class="content active">
                    Choose a game,click on the game follow the on-screen instructions to start playing.
                </div>
            </div>

            <div class="box">
                <div class="title">
                    <h3>Is creating an account necessary to play?</h3>
                    <i class="fa fa-plus"></i>
                </div>
                <div class="content">
                    You can play most games without an account, but creating one lets you save progress and access
                    special features.
                </div>
            </div>

            <div class="box">
                <div class="title">
                    <h3>Are there any age restrictions for these games?</h3>
                    <i class="fa fa-plus"></i>
                </div>
                <div class="content">
                    Our games are suitable for all ages, though some may require basic reading skills. We recommend
                    parental guidance for younger children.
                </div>
            </div>

            <div class="box">
                <div class="title">
                    <h3>Are there any in-game purchases or premium features?</h3>
                    <i class="fa fa-plus"></i>
                </div>
                <div class="content">
                    Most of our games are completely free to play, but some may offer optional in-game purchases or
                    premium features to enhance your experience.
                </div>
            </div>

            <div class="box">
                <div class="title">
                    <h3>Do I need to install any plugins to play these games?</h3>
                    <i class="fa fa-plus"></i>
                </div>
                <div class="content">
                    No installations needed! All games run directly in your modern web browser.
                </div>
            </div>
        </section>
    </div>

    <div class="feedback" id="feedback">
        <section class="box-container">
            <h1 class="heading"><span>P</span>layer <span>F</span>eedback</h1>

            <div class="feedback-form">
                <div id="feedback-message" style="display: none;">
                    <div class="alert-box"
                        style="background: var(--bg-color); padding: 2rem; border-radius: 0.5rem; margin-bottom: 2rem; text-align: center;">
                        <h3 style="color: var(--main-color);">Thank you for your feedback!</h3>
                        <p style="color: var(--light-white);">Your feedback has been recorded successfully.</p>
                        <button onclick="hideFeedbackMessage()" class="btn" style="margin-top: 1rem;">OK</button>
                    </div>
                </div>

                <form action="feedback.php" method="POST" name="feedbackForm" id="feedbackForm">
                    <?php if (isset($_SESSION['name'])): ?>
                        <input type="hidden" name="name" value="<?= htmlspecialchars($_SESSION['name']); ?>">

                    <?php else: ?>

                        <p style="color: red; font-weight: bold;">
                            You must be logged in to submit feedback.
                        </p>
                        <br>

                    <?php endif; ?>

                    <div class="input-group">
                        <select name="rating" id="rating" required>
                            <option value="" disabled selected>Rate your experience</option>
                            <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
                            <option value="4">⭐⭐⭐⭐ - Very Good</option>
                            <option value="3">⭐⭐⭐ - Good</option>
                            <option value="2">⭐⭐ - Fair</option>
                            <option value="1">⭐ - Poor</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <textarea name="message" id="message" rows="5" placeholder="Your feedback..."
                            required></textarea>
                    </div>
                    <button type="submit" class="btn" <?= !isset($_SESSION['name']) ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : '' ?>>
                        Submit Feedback
                    </button>

                </form>
            </div>
        </section>
    </div>

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
                <p>By using this gaming website,<br>
                    you agree to follow all rules and policies.
                    Any misuse may result in account suspension or termination.
                    Enjoy responsibly!</p>
                <div class="share-links">
                    <a href="https://www.youtube.com/" class="fab fa-youtube"></a>
                    <a href="https://www.linkedin.com/" class="fab fa-linkedin"></a>
                    <a href="https://www.github.com/" class="fab fa-github"></a>
                    <a href="https://www.discord.com/" class="fab fa-discord"></a>
                </div>
            </div>

            <div class="box">
                <h3>Did You Know?</h3>
                <p class="info">Long before PlayStation, Xbox, or even arcade machines, a physicist named William
                    Higinbotham created what is considered the first video game: Tennis for Two. It was a simple tennis
                    simulation displayed on an oscilloscope and played using a rotary knob and a button.</p>
            </div>
        </section>

        <section class="credit">
            <p>Created by: <span>Danita,Jumana,Rameil</span></p>
            <p>🌟 Thanks for playing with us! © 2025</p>
        </section>
    </footer>

    <script src="script.js"></script>

</body>

</html>