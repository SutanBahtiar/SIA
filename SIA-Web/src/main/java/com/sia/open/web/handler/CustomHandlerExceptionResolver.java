package com.sia.open.web.handler;

import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CustomHandlerExceptionResolver implements HandlerExceptionResolver {

    @Override
    public ModelAndView resolveException(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) {
        ModelAndView modelAndView = new ModelAndView("response");

        modelAndView.addObject("success", false);
        modelAndView.addObject("exception", e.getMessage());
        modelAndView.addObject("msg", "error");

        httpServletResponse.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);

        if (e instanceof MaxUploadSizeExceededException) {
            modelAndView.addObject("msg", "Dokumen gagal diunggah karena melebihi batas maksimum "
                    + ((MaxUploadSizeExceededException) e).getMaxUploadSize() + " Bytes");
            httpServletResponse.setStatus(HttpServletResponse.SC_NOT_ACCEPTABLE);
        }

        return modelAndView;
    }
}
