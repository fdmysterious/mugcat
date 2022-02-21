# Docker container for mugcat.fr
# Florian Dupeyron
# March 2021

FROM nginx:latest

# Create required users
RUN groupadd http
RUN useradd -s /bin/bash -g http http

# Copy files to various directories
COPY --chown=http:http build /srv/http
RUN chmod -R 755 /srv/http
COPY nginx-config /etc/nginx

# Test config
#RUN nginx -t
