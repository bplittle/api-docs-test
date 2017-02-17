#!/bin/bash
set -e
echo "Hello World!"
rake build
bundle exec rake publish --trace
echo "Done deploying docs"
