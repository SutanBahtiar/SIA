<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title id="page-title">SIA Management Sistem</title>
    <link rel="shortcut icon" href="<c:url value="/resources/img/favicon.ico"/>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Le styles -->
    <link href="<c:url value="/resources/login/bootstrap.css" />" rel="stylesheet">
    <link rel="stylesheet" href="<c:url value="/resources/login/style.css" />">


    <style type="text/css">
        body {
            background-image: url("<c:url value="/resources/img/banner-bg.jpg" />");
            padding-top: 180px;

        }
    </style>
</head>

<body>


<div class="container" style="margin-top: -60px">

    <div class="row">

        <div class="span6 offset3 thumbnail" style="background-color: #ffffff;padding: 10px;">

            <div class="row-fluid">
<!--                <div class="span4">
                    <img src="<c:url value="/resources/img/logo.png" />" alt="">
                </div>-->
                <div class="span8">
                    <form id="contact-form" accept-charset="UTF-8" action="<c:url value="/login"/>" class="span12"
                          method="post">
                        <fieldset>

                            <div class="well">
                                <div class="control-group">
                                    <div class="controls">
                                        <div style="min-height: 100px;">
                                            <h6 style="font-size: 20px">SIA</h6>
                                            <h5 style="font-size: 15px">SIA Management Application</h5>
                                            <br/>
                                            Selamat datang di aplikasi SIA. Silahkan mengisi username &
                                            password
                                            pada panel dibawah ini.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <c:if test="${not empty param.error}">
                                <h3 style="color: red;">Wrong Username Or Password!!</h3>
                            </c:if>

                            <div class="well">
                                <div class="controls">
                                    <div class="input-prepend">
                                        <span class="add-on"><i class="icon-user"></i></span><input
                                            placeholder="Username" class="input-large" size="16" type="text"
                                            name="j_username">
                                    </div>

                                </div>

                                <div class="controls">
                                    <div class="input-prepend">
                                        <span class="add-on"><i class="icon-lock"></i></span><input
                                            placeholder="Password" class="input-large" size="16" type="password"
                                            name="j_password">
                                    </div>

                                </div>
                            </div>

                            <div class="">
                                <button type="submit" class="btn btn-success pull-right"><i
                                        class="icon-ok icon-white"></i>
                                    <strong>Login</strong></button>

                            </div>

                        </fieldset>
                    </form>
                </div>
            </div>
        </div>

    </div>

</div>

</body>
</html>
